import {Component, OnInit} from '@angular/core';
import {Users} from '../../classes/users';
import {UsersService} from '../../../core/services/users.service';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {

    users: Users[] = [];

    constructor(private userService: UsersService) {
    }

    ionViewWillEnter() {
        console.log('setting');
        this.setUsers();
    }

    setUsers() {
        this.users = this.userService.getUsersList();
        console.log('users',this.users);
    }

    ngOnInit(): void {
    }

}
