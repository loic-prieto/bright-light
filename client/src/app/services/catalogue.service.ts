import { Injectable } from '@angular/core';
import { CatalogueUnit } from '../model/CatalogueUnit';
import { UnitCatalogue } from '../model/UnitCatalogue';
import { Maybe } from 'purify-ts'

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  inMemoryCatalogueDatabase = new Map<CatalogueKey,UnitCatalogue>()

  constructor() {
    this.inMemoryCatalogueDatabase.set({name: "fake", version: "1.0.0"},new UnitCatalogue("fake","1.0.0",[
      new CatalogueUnit("Edged Elves Fighters",100,"Troops"),
      new CatalogueUnit("Shark Jumpers",200,"Fast Attack"),
      new CatalogueUnit("Lobotomised Penal Serfs",50,"Elite")
    ]))
   }

   public getCatalogue(name: string, version: string): Maybe<UnitCatalogue> {
    return Maybe.fromNullable(
      this.inMemoryCatalogueDatabase.get({name:name,version:version}))
   }

  public getAvailableCatalogues(): Array<CatalogueListItem> {
    return [ {name: "fake",version: "1.0.0"} ]
  }
}

export interface CatalogueListItem {
  name: string,
  version: string
}

interface CatalogueKey {
  name: string
  version: string
}