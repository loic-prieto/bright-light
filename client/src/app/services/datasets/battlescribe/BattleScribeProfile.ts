import { BattleScribeCharacteristic } from "./BattleScribeCharacteristic";
import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeModifierGroup } from "./BattleScribeModifierGroup";

export class BattleScribeProfile extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public publicationId: string,
        public hidden: boolean,
        public typeId: string,
        public typeName: string,
        public modifierGroups: Array<BattleScribeModifierGroup>,
        public characteristics: Array<BattleScribeCharacteristic>,
    ){
        super(id,name)
    }
}