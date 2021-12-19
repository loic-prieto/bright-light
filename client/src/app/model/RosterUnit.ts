import { CatalogueUnit } from "./CatalogueUnit";

export class RosterUnit {
    name: string;
    type: string;
    description: string;

    constructor(name: string, type: string, description: string){
        this.name = name;
        this.type = type;
        this.description = description;
    }

    public static fromCatalogueUnit(unit: CatalogueUnit ): RosterUnit {
        return new RosterUnit("",unit.type,"");
    }

}