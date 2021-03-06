import { PasswordEffects } from './store/effects/password.effects';
import { ResetPasswordGuardService } from './reset-password-guard.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { ResetPasswordEmailComponent } from './reset-password-email/reset-password-email.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UiModule } from '../../shared/module/ui/ui.module';
import { routes } from './state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('reset-password', {}),
    EffectsModule.forFeature([PasswordEffects]),
    UiModule
  ],
  declarations: [
    ResetPasswordComponent,
    ResetPasswordEmailComponent,
    ResetPasswordFormComponent,
  ],
  providers: [
    ResetPasswordGuardService,
  ]
})
export class ResetPasswordModule { }
