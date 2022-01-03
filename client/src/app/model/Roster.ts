import { RosterUnit } from "./RosterUnit";

export class Roster {
    constructor(
        public name: string,
        private catalogue: ShortCatalogue,
        private units: Array<RosterUnit> = []){
    }

    public getCatalogue(): Readonly<ShortCatalogue> {
       return this.catalogue
    }

    public getUnits(): Readonly<Array<RosterUnit>> {
        return this.units as Readonly<Array<RosterUnit>>
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