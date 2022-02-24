export class BattleScribeCondition {
    constructor(
        public field: string,
        public scope: string,
        public value: string,
        public percentValue: boolean,
        public shared: boolean,
        public includeChildSelections: boolean,
        public includeChildForces: boolean,
        public childId: string,
        public type: string
    ){}
}