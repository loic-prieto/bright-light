import { CatalogueUnit } from "./CatalogueUnit";

/**
 * A catalogue contains a definition of attributes, description and abilities of
 * different units, as well as rules and constraints to build a roster from those 
 * units.
 */
export class UnitCatalogue {
    constructor(
        public name: string,
        public version: string,
        private unitList: Array<CatalogueUnit> = []
    ){}

    public addUnitDefinition(type: string, category: string, cost = 0){
        this.unitList.push(new CatalogueUnit(type,cost,category))
    }

    public getUnitList(): Readonly<Array<CatalogueUnit>> {
        return this.unitList
    }
}