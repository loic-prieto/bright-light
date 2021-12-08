import { CatalogueUnit } from "./CatalogueUnit";

export class UnitCatalogue {
    constructor(
        public unitList: Array<CatalogueUnit> = []
    ){}

    public addUnitDefinition(type: string, category: string, cost: number = 0){
        this.unitList.push(new CatalogueUnit(type,cost,category))
    }
}