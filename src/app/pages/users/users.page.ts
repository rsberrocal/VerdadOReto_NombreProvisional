import { Component, OnInit } from '@angular/core';
import {Users} from "../../shared/classes/users";
import {UsersService} from "../../core/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: Users[];

  constructor(private userService: UsersService, private router: Router) {
      this.users = this.userService.userList.sort(function (a, b) {
          return b.score - a.score
      });
  }

  ngOnInit() {
  }
    navigate(routerLink) {
        this.router.navigate([routerLink], {replaceUrl: true});
        //Aqui va el metodo para pasar a la siguiente ronda.
    }

}
