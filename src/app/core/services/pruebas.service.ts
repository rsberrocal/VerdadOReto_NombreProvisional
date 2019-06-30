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
        this.loadPruebas();
    }

    loadPruebas() {
        this.pruebasList = pruebasConfig.Pruebas as Pruebas[];
        }
    getPruebas(): Pruebas[]{
        return this.pruebasList;
    }
}