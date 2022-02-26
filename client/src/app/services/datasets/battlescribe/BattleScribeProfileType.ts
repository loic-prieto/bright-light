import { Maybe } from "purify-ts";
import { getOptionalArray } from "src/app/util/sxml-utils";
import { XML } from "sxml";
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
        public characteristicTypes:Maybe<Array<BattleScribeCharacteristicType>>) 
    {
        super(id,name)
    }

    static fromXMLNode(xmlNode: XML):BattleScribeProfileType {
        const id = xmlNode.getProperty("id")
        const name = xmlNode.getProperty("name")
        const characteristicTypes = getOptionalArray("characteristicTypes",xmlNode,BattleScribeCharacteristicType.fromXMLNode)

        return new BattleScribeProfileType(id,name,characteristicTypes)
    }
    

}