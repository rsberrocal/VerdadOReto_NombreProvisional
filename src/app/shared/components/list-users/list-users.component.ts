import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Users} from '../../classes/users';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
    @Input() users: Users[];

    @Output() deleteEvent = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }

    getUsers(): Users[] {
        return this.users;
    }

    deleteUser(userToDelete: Users) {
        this.deleteEvent.emit(userToDelete);
    }
}
