import { Injectable } from '@angular/core';
import { CatalogueUnit } from '../model/CatalogueUnit';
import { UnitCatalogue } from '../model/UnitCatalogue';
import { Maybe } from 'purify-ts'

/**
 * Provides functions related to managing catalogues
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  // Forget the power of using objects as keys in maps, for so much has been forgotten never to 
  // be relearned...
  inMemoryCatalogueDatabase = new Map<string,UnitCatalogue>()

  constructor() {
    // For this milestone, we're just building a fake in-memory database
    this.inMemoryCatalogueDatabase.set(catalogueKey("fake","1.0.0"),new UnitCatalogue("fake","1.0.0",[
      new CatalogueUnit("Edged Elves Fighters",100,"Troops"),
      new CatalogueUnit("Shark Jumpers",200,"Fast Attack"),
      new CatalogueUnit("Lobotomised Penal Serfs",50,"Elite")
    ]))
   }

   public getCatalogue(name: string, version: string): Maybe<UnitCatalogue> {
    return Maybe.fromNullable(this.inMemoryCatalogueDatabase.get(catalogueKey(name,version)))
   }

  public getAvailableCatalogues(): Array<CatalogueListItem> {
    return [ {name: "fake",version: "1.0.0"} ]
  }
}

/**
 * A simplified projection of a Catalogue to be used in lists
 */
export interface CatalogueListItem {
  name: string,
  version: string
}

function catalogueKey(catalogueName: string, catalogueVersion: string): string {
  return `${catalogueName}-${catalogueVersion}`
}