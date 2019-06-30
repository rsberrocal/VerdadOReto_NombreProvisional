import { Injectable } from '@angular/core';
import {Users} from "../../shared/classes/users";

@Injectable({
  providedIn: 'root'
})
export class CurrentPruebaService {
  currentuser: Users;
  score: number;
  constructor() { }
  getCurrentUser(): Users{
    return this.currentuser
  }
  getScore(): number{
    return this.score;
  }
  setCurrentInfo(user: Users, x: number): void{
    this.currentuser=user;
    this.score= x;
    console.log("Adiosi");
  }
}
