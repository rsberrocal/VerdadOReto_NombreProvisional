import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Users} from '../../classes/users';
import {UsersService} from '../../../core/services/users.service';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit,OnChanges {

    @Input()usersList: Users[] = [];

    constructor(private userService: UsersService) {
        console.log(this.usersList);
    }

    ionViewWillEnter() {
        console.log('setting');
    }


    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('eqwe',changes);
    }

}
