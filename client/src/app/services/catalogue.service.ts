import { Injectable } from '@angular/core';
import { CatalogueUnit } from '../model/CatalogueUnit';
import { UnitCatalogue } from '../model/UnitCatalogue';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor() { }

  public getFakeCatalogue(){
    return new UnitCatalogue([
      new CatalogueUnit("Edged Elves Fighters",100,"Troops"),
      new CatalogueUnit("Shark Jumpers",200,"Fast Attack"),
      new CatalogueUnit("Lobotomised Penal Serfs",50,"Elite")
    ])
  }

  public getAvailableCatalogues(): Array<CatalogueListItem> {
    return [ {name: "fake",version: "1.0.0"} ]
  }
}

export interface CatalogueListItem {
  name: string,
  version: string
}