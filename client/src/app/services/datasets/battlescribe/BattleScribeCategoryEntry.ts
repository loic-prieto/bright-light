import { BattleScribeEntity } from "./BattleScribeEntity";

/**
 * Represents a unit category in a catalogue.
 * For example, a 
 */
export class BattleScribeCategoryEntry extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean
    ){
        super(id,name)
    }
}