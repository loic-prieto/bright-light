import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeModifier } from "./BattleScribeModifier";

export class BattleScribeSelectionEntry extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public publicationId: string,
        public page: number,
        public hidden: boolean,
        public collective: boolean,
        public importTag: boolean,
        public type: string,
        public modifiers: Array<BattleScribeModifier>,
        public constraints: Array<BattleScribeConstraint>,

    ){
        super(id,name)
    }
}