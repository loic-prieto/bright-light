import { CatalogueUnit } from "./CatalogueUnit";


/**
 * A unit inside a roster. 
 * What a unit means depends on the game: it may be a squad of soldiers, or a single character. 
 */
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