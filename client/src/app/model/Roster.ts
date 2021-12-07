import { Unit } from "./Unit";

export class Roster {
    units: Array<Unit>;

    constructor(units: Array<Unit> = []){
        this.units = units;
    }

    public addUnit(unit: Unit): void {
        this.units.push(unit);
    }
}