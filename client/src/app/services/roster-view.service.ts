import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CatalogueUnit } from '../model/CatalogueUnit';


/**
 * Allows the roster view child components to communicate between themselves
 */
 @Injectable()
 export class RosterViewService {
    constructor() { }

    private unitAddedSource = new Subject<CatalogueUnit>();
    unitAdded$ = this.unitAddedSource.asObservable();

    public emitUnitAdded(unit: CatalogueUnit) {
        this.unitAddedSource.next(unit)
    }
 }