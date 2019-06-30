import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {UsersPage} from './users.page';
import {UsersRoutingPage} from './users-routing.page';
import {AddUserPage} from './add-user/add-user.page';
import {AddUserPageModule} from './add-user/add-user.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UsersRoutingPage,
        AddUserPageModule,
        SharedModule
    ],
    declarations: [UsersPage]
})
export class UsersPageModule {
}
