import { BattleScribeCondition } from "./BattleScribeCondition";

export class BattleScribeModifier {
    constructor(
        public type: string,
        public field: string,
        public value: string,
        public conditions: Array<BattleScribeCondition>
    ){}
}