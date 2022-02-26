import { BattleScribeCondition } from "./BattleScribeCondition";
import { BattleScribeConditionGroup } from "./BattleScribeConditionGroup";

export class BattleScribeModifier {
    constructor(
        public type: string,
        public field: string,
        public value: string,
        public conditions: Array<BattleScribeCondition>,
        public conditionGroups: Array<BattleScribeConditionGroup>
    ){}
}