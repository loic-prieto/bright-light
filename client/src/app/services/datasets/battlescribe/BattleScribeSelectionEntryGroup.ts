import { BattleScribeConstraint } from "./BattleScribeConstraint";
import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeEntryLink } from "./BattleScribeEntryLink";
import { BattleScribeModifier } from "./BattleScribeModifier";

export class BattleScribeSelectionEntryGroup extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean,
        public collective: boolean,
        public importTag: boolean,
        public defaultSelectionEntryId: string,
        public modifiers: Array<BattleScribeModifier>,
        public constraints: Array<BattleScribeConstraint>,
        public entryLinks: Array<BattleScribeEntryLink>
    ){
        super(id,name)
    }
}