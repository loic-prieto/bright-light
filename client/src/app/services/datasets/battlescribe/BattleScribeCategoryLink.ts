import { BattleScribeEntity } from "./BattleScribeEntity";

export class BattleScribeCategoryLink extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean,
        public targetId: string,
        public primary: boolean
    ){
        super(id,name)
    }
}