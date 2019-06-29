import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {UsersPage} from './users.page';
import {UsersRoutingPage} from './users-routing.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UsersRoutingPage
    ],
    declarations: [UsersPage]
})
export class UsersPageModule {
}
