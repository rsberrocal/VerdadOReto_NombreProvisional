import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersPage} from './users.page';
import {AddUserPage} from './add-user/add-user.page';

const routes: Routes = [
    {path: '', component: UsersPage},
    {path: 'add-user', component: AddUserPage}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UsersRoutingPage {
}
