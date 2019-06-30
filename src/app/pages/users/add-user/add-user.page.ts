import {Component, OnInit} from '@angular/core';
import {Users} from '../../../shared/classes/users';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.page.html',
    styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

    userToAdd: Users = new Users();

    constructor() {
    }

    ngOnInit() {
    }

    addUser() {
        console.log('USER', this.userToAdd);
    }

}
