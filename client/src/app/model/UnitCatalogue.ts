import { CatalogueUnit } from "./CatalogueUnit";

export class UnitCatalogue {
    constructor(
        public name: string,
        public version: string,
        private unitList: Array<CatalogueUnit> = []
    ){}

    public addUnitDefinition(type: string, category: string, cost: number = 0){
        this.unitList.push(new CatalogueUnit(type,cost,category))
    }

    public getUnitList(): Readonly<Array<CatalogueUnit>> {
        return this.unitList
    }
}