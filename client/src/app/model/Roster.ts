import { RosterUnit } from "./RosterUnit";

export class Roster {
    constructor(
        private catalogue: ShortCatalogue, 
        private units: Array<RosterUnit> = []){
    }

    public addUnit(unit: RosterUnit): void {
        this.units.push(unit);
    }
}

/**
 * This is a projection of a Catalogue with the minimum information a roster needs
 * to know about itself.
 */
export interface ShortCatalogue {
    name: string
    version: string
}