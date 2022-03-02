import {getBool, getOptionalArray, getOptionalElementText} from "src/app/util/sxml-utils";
import {XML} from "sxml";
import {BattleScribeEntity} from "./BattleScribeEntity";
import {BattleScribeModifier} from "./BattleScribeModifier";
import {Maybe} from "purify-ts";
import {BattleScribeConstraint} from "./BattleScribeConstraint";

/**
 * Represents a unit category in a catalogue.
 */
export class BattleScribeCategoryEntry extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public comment: Maybe<string>,
        public hidden: boolean,
        public modifiers: Maybe<Array<BattleScribeModifier>>,
        public constraints: Maybe<Array<BattleScribeConstraint>>
    ){
        super(id,name)
    }

    static fromXMLNode(xmlNode: XML): BattleScribeCategoryEntry {

        return new BattleScribeCategoryEntry(
            xmlNode.getProperty("id"),
            xmlNode.getProperty("name"),
            getOptionalElementText("comment",xmlNode),
            getBool("hidden",xmlNode),
            getOptionalArray("modifiers", xmlNode, BattleScribeModifier.fromXMLNode),
            getOptionalArray("constraints", xmlNode, BattleScribeConstraint.fromXMLNode),
        )
    }
}