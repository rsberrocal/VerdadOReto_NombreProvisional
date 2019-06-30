import {Component, OnInit} from '@angular/core';
import {Users} from '../../../shared/classes/users';
import {UsersService} from '../../../core/services/users.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.page.html',
    styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

    userToAdd: Users = new Users();
    users: Users[];
    invalid = "";

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.setUsers();
    }

    addUser() {
        if (this.userToAdd.name=="") {
            this.invalid = "invalido";
        } else {
            this.usersService.addUser(this.userToAdd.name);
            this.userToAdd = new Users();
        }
    }

    setUsers() {
        this.users = this.usersService.getUsersList();
    }

    deleteUserEvent(event) {
        this.usersService.removeUser(event);
    }
}
