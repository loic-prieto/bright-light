import { BattleScribeCharacteristicType } from "./BattleScribeCharacteristicType";
import { BattleScribeEntity } from "./BattleScribeEntity"

/**
 * Represents an aggregation of quantifiable concepts that is given a name,
 * and that can be linked to several unit types.
 * For example, the "Explosion" profile type is a concept that can be linked
 * to a vehicle, that describes how that concept is triggered during a game, with
 * its linked CharacteristicTypes "Dice Roll", "Mortal Wound" and "Distance".
 * See BattleScribeCharacteristicType.
 */
export class BattleScribeProfileType extends BattleScribeEntity{
    constructor(
        id: string,
        name: string,
        public characteristicTypes:Array<BattleScribeCharacteristicType>) {
            super(id,name)
        }
}