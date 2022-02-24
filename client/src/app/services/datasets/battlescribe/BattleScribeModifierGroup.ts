import { BattleScribeCondition } from "./BattleScribeCondition";
import { BattleScribeModifier } from "./BattleScribeModifier";

export class BattleScribeModifierGroup {
    constructor(
        public conditions: Array<BattleScribeCondition>,
        public modifiers: Array<BattleScribeModifier>
    ){}
}