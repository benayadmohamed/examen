import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {UserState} from "./store/user.state";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgxsModule.forFeature([CategoryState]),
  ]
})
export class UserModule {
}
