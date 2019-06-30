import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {RankingComponent} from './components/ranking/ranking.component';

@NgModule({
    declarations: [
        ListUsersComponent,
        RankingComponent
    ],
    exports: [
        ListUsersComponent,
        RankingComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
})
export class SharedModule {
}
