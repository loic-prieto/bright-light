import { BattleScribeCategoryLink } from "./BattleScribeCategoryLink";
import { BattleScribeConstraint } from "./BattleScribeConstraint";
import { BattleScribeCost } from "./BattleScribeCost";
import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeEntryLink } from "./BattleScribeEntryLink";
import { BattleScribeInfoLink } from "./BattleScribeInfoLink";
import { BattleScribeModifier } from "./BattleScribeModifier";
import { BattleScribeProfile } from "./BattleScribeProfile";
import { BattleScribeSelectionEntryGroup } from "./BattleScribeSelectionEntryGroup";

/**
 * This class seems to represent units or weapons
 */
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
        public profiles: Array<BattleScribeProfile>,
        public infoLinks: Array<BattleScribeInfoLink>,
        public categoryLinks: Array<BattleScribeCategoryLink>,
        public selectionEntryGroups: Array<BattleScribeSelectionEntryGroup>,
        public entryLinks: Array<BattleScribeEntryLink>,
        public costs: Array<BattleScribeCost>
    ){
        super(id,name)
    }
}