import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-other-coin-thumbnail',
  templateUrl: './other-coin-thumbnail.component.html',
  styleUrls: ['./other-coin-thumbnail.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class OtherCoinThumbnailComponent {
  @Input()
  public item;

  @Input()
  public fullMode;

  @Input()
  public crestokenBuySellTableBoolean;

  @Output()
  public setDeposit = new EventEmitter();

  @Output()
  public setWithdrawal = new EventEmitter();

  // tslint:disable-next-line
  public CSTTBtnState = {
    name: 'Buy',
    class: 'redBig'
  };

  public depositBtnState = {
    name: 'Deposit',
    class: 'emptyGreen'
  };

  public withdrawalBtnState = {
    name: 'Withdrawal',
    class: 'emptyRed'
  };

  public setDepositCoin(coin) {
    this.setDeposit.next(coin);
  }

  public setWithdrawalCoin(coin) {
    this.setWithdrawal.emit(coin);
  }

}
