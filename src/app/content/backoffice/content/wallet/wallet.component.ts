import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IRootState } from '../../../../store/reducers';
import { TransactionRequest } from './store/actions/transaction.actions';
import { getWalletsData } from '../../store/selectors/assets.selector';
import { PurchaseRequest } from './store/actions/purchase.action';
import { getWalletsListPurchase } from './store/selectors/purchase.selector';
import { getWalletsListTransactions } from './store/selectors/transaction.selector';
import { GenerateWalletAddressRequest } from '../../store/actions/wallets.action';
import { ModalService } from '../../../../shared/services/modal.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./wallet.component.sass']
})
export class WalletComponent implements OnInit, OnDestroy {

  public assets$!: Observable<any>;
  public wallets$!: Observable<WalletData[]>;
  public walletNames = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    xmr: 'Monero',
    cstt: 'Crest Token'
  };

  public depositBtn = {
    name: 'Deposit',
    class: 'emptyGreen'
  };

  public withdrawBtn = {
    name: 'Withdrawal',
    class: 'emptyRed'
  };
  public buyBtn = {
    name: 'BUY',
    class: 'redBig'
  };
  public transactions$!: Observable<any>;
  public purchase$!: Observable<any>;

  public historyType: string = 'transaction';
  public purchaseHistory = false;
  public currentCoin!: WalletData | null;
  public viewPort = innerWidth;

  private _routerSubscription!: Subscription;

  public constructor(
    private _store: Store<IRootState>,
    private _router: Router,
    private _modalService: ModalService
  ) {
  }

  public ngOnInit() {

    this._routerSubscription = this._routerSubscription = this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(this._resetRouterState.bind(this));

    this.assets$ = this._store.select('backoffice', 'assets', 'data');
    this.wallets$ = this._store.select(getWalletsData);
    this.transactions$ = this._store.select(getWalletsListTransactions);
    this.purchase$ = this._store.select(getWalletsListPurchase);

    this._store.select('backoffice', 'user', '_id')
      .pipe(
        filter((id: string | null) => Boolean(id))
      )
      .subscribe((id) => {
        if (id === null) {
          return;
        }
        this._store.dispatch(new TransactionRequest(id));
        this._store.dispatch(new PurchaseRequest(id));
      });
  }

  public ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }

  public setCoin(coin: WalletData) {
    this.currentCoin = coin;
    this.historyType = 'transaction';
    if (!this.currentCoin.top_up_address && this.currentCoin.id) {
      this._store.dispatch(new GenerateWalletAddressRequest({ wallet_id: this.currentCoin.id }));
    }
  }

  public setToken() {
    this.currentCoin = null;
    this.historyType = 'purchase';
  }

  public openModal(id: string) {
    this._modalService.open(id);
  }

  public closeModal(id: string) {
    this._modalService.close(id);
  }

  public onResize(event) {
    this.viewPort = event.target.innerWidth;
  }

  private _resetRouterState(): void {
    this.historyType = 'transaction';
    this.currentCoin = null;
  }
}
