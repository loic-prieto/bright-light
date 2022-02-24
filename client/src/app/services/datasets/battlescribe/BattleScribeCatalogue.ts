import { BattleScribeCategoryEntry } from "./BattleScribeCategoryEntry"
import { BattleScribeEntity } from "./BattleScribeEntity"
import { BattlesCribeProfileType } from "./BattleScribeProfileType"
import { BattleScribePublication } from "./BattleScribePublication"

/**
 * Represents a Battlescribe Catalogue
 */
export class BattlescribeCatalogue extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public publications: Array<BattleScribePublication>,
        public revision: number,
        public battleScribeVersion: string,
        public authorName: string,
        public authorContact: string,
        public authorUrl: string,
        public library: boolean,
        public gameSystemId: string,
        public gameSystemRevision: number,
        public profileTypes: Array<BattlesCribeProfileType>,
        public categoryEntries: Array<BattleScribeCategoryEntry>
    ){
        super(id,name)
    }

    
}