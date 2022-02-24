import { BattleScribeCategoryLink } from "./BattleScribeCategoryLink";
import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeModifier } from "./BattleScribeModifier";
import { BattleScribeModifierGroup } from "./BattleScribeModifierGroup";

/**
 * I don't know what this represents
 */
export class BattleScribeEntryLink extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean,
        public collective: boolean,
        public importTag: boolean,
        public targetId: string,
        public type: string,
        public modifiers: Array<BattleScribeModifier>,
        public categoryLinks: Array<BattleScribeCategoryLink>,
        public modifierGroups: Array<BattleScribeModifierGroup>
    ){
        super(id,name)
    }
}