import { BattleScribeEntity } from "./BattleScribeEntity";

export class BattleScribeCatalogueLink extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public targetId: string,
        public type: string,
        public importRootEntries: boolean
    ){
        super(id,name)
    }
}