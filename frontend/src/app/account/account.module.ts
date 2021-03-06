import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login/login.service';
import {FlexModule} from '@angular/flex-layout';
import {accountRoute} from './account.route';
import {AlertModule} from '../layout/alert/alert.module';
import {SpinnerModule} from '../layout/spinner/spinner.module';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MatDialogModule} from "@angular/material/dialog";
import { RegistrationComponent } from './registration/registration.component';
import {EditProfileModalComponent} from "./edit-profile-modal/edit-profile-modal.component";

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    RegistrationComponent,
    EditProfileModalComponent
  ],
  imports: [
    RouterModule.forChild(accountRoute),
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    FlexModule,
    AlertModule,
    SpinnerModule,
    MatDialogModule
  ],
  entryComponents: [
    ChangePasswordComponent,
    EditProfileModalComponent
  ],
  providers: [
    LoginService
  ]
})
export class AccountModule {
}
