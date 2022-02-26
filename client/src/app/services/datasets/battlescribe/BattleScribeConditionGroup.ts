import { BattleScribeCondition } from "./BattleScribeCondition";

export class BattleScribeConditionGroup {
    constructor(
        public conditionGroups: Array<BattleScribeConditionGroup>,
        public conditions: Array<BattleScribeCondition>
    ){}
}