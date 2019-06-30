import { Component, OnInit } from '@angular/core';
import {Users} from "../../shared/classes/users";
import {UsersService} from "../../core/services/users.service";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  rankingList: Users[];

  constructor(private userService: UsersService) {
    this.rankingList = this.userService.getUsersList().sort(function (a, b) {
      return b.score - a.score
    });
  }

  ngOnInit() {
  }
  getRankingList(): Users[]{
    return this.rankingList;
  }
}



