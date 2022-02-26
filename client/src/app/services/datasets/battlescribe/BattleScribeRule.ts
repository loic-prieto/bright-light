import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeModifier } from "./BattleScribeModifier";

export class BattleScribeRule extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean,
        public publicationId: string,
        public page: number,
        public modifiers: Array<BattleScribeModifier>,
        public description: string,
    ){
        super(id,name)
    }
}