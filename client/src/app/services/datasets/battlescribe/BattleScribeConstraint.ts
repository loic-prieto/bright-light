export class BattleScribeConstraint {
    constructor(
        public id: string,
        public field: string,
        public scope: string,
        public value: string,
        public percentValue: boolean,
        public shared: boolean,
        public includeChildSelections: boolean,
        public includeChildForces: boolean,
        public type: string
    ){}
}