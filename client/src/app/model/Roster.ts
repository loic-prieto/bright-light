import { RosterUnit } from "./RosterUnit";

export class Roster {
    units: Array<RosterUnit>;

    constructor(units: Array<RosterUnit> = []){
        this.units = units;
    }

    public addUnit(unit: RosterUnit): void {
        this.units.push(unit);
    }
}