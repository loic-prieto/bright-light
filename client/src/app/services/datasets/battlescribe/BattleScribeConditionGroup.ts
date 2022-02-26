import { BattleScribeCondition } from "./BattleScribeCondition";

export class BattleScribeConditionGroup {
    constructor(
        public type: string,
        public conditionGroups: Array<BattleScribeConditionGroup>,
        public conditions: Array<BattleScribeCondition>
    ){}
}