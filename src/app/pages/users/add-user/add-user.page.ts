import {Component, OnInit} from '@angular/core';
import {Users} from '../../../shared/classes/users';
import {UsersService} from "../../../core/services/users.service";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.page.html',
    styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

    userToAdd: Users = new Users();

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
    }

    addUser() {
        this.usersService.addUser(this.userToAdd.name)
        console.log(this.usersService.getUsersList());
    }

}
