import {Component, OnInit} from '@angular/core';
import {Users} from "../../shared/classes/users";
import {UsersService} from "../../core/services/users.service";
import {Router} from "@angular/router";

import {PruebasService} from "../../core/services/pruebas.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
    users: Users[];

    constructor(private userService: UsersService, private router: Router, private pruebaService: PruebasService) {
        this.users = this.userService.userList.sort(function (a, b) {
            return b.score - a.score
        });
    }

    ngOnInit() {
    }

    navigate(routerLink) {
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].score = 0;
            this.userService.userList[i].score = 0;
            this.users[i].havePlayed = false;
            this.userService.userList[i].havePlayed = false;
            this.pruebaService.rondas = 1;
        }
        this.router.navigate([routerLink]);
        //Aqui va el metodo para pasar a la siguiente ronda.
    }

}
