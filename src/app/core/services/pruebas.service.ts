import { Injectable } from '@angular/core';
import {Pruebas} from '../../shared/classes/pruebas';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  pruebasList: Pruebas[] = [];
  constructor() { }

  loadPruebas(){
    
  }
}
