import { getBool } from "src/app/util/sxml-utils";
import { XML } from "sxml";
import { BattleScribeEntity } from "./BattleScribeEntity";

/**
 * Represents a unit category in a catalogue.
 */
export class BattleScribeCategoryEntry extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean
    ){
        super(id,name)
    }

    static fromXMLNode(xmlNode: XML): BattleScribeCategoryEntry {

        return new BattleScribeCategoryEntry(
            xmlNode.getProperty("id"),
            xmlNode.getProperty("name"),
            getBool("hidden",xmlNode)
        )
    }
}