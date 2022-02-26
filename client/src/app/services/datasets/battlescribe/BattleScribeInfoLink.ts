import { BattleScribeEntity } from "./BattleScribeEntity";

export class BattleScribeInfoLink extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean,
        public targetId: string,
        public type: string
    ) {
        super(id,name)
    }
}