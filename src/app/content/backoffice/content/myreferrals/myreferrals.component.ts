import { environment } from '../../../../../environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GetReferralUsers } from './store/actions/referrals-users.action';
import { IRootState } from '../../../../store/reducers';
import { getReferralUsers } from './store/selectors/referralUsers.selector';

@Component({
  selector: 'app-myreferrals',
  templateUrl: './myreferrals.component.html',
  styleUrls: ['./myreferrals.component.sass']
})
export class MyreferralsComponent implements OnInit, OnDestroy {
  public roundsReferralsUsers$!: Observable<User[]>;
  public referralLink;
  public userSubscription!: Subscription;
  public loader$!: Observable<boolean>;
  public referralUsersHeaders = [
    'S/N', 'Referral Username', 'Date Registered'
  ];

  public constructor(
    private _store: Store<IRootState>
  ) {
  }

  public ngOnInit(): void {
    this.roundsReferralsUsers$ = this._store.select(getReferralUsers );
    this.loader$ = this._store.select('referrals', 'referralUsers', 'isLoading');
    this._store.dispatch(new GetReferralUsers());


    this.userSubscription = this._store.select('backoffice', 'user', 'referralHash')
      .subscribe((referralHash: string) => {
        this.referralLink = `${environment.domain}/?ref=${referralHash}`;
      });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
