import {Injectable} from '@angular/core';
import {Pruebas} from '../../shared/classes/pruebas';

// @ts-ignore
import * as pruebasConfig from '../../config/pruebas.config.json';

@Injectable({
    providedIn: 'root'
})
export class PruebasService {
    pruebasList: Pruebas[] = [];

    constructor() {
    }

    loadPruebas() {
        this.pruebasList = pruebasConfig.Pruebas as Pruebas[];
        for(let t of this.pruebasList){
            console.log(t);
        }
        console.log('json', pruebasConfig.Pruebas);
        console.log('array', this.pruebasList);
    }
}
