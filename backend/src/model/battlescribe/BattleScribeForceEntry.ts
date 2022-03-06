import { Maybe } from "purify-ts";
import { getBool, getOptionalArray } from "src/app/util/sxml-utils";
import { XML } from "sxml";
import { BattleScribeCategoryLink } from "./BattleScribeCategoryLink";
import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeModifier } from "./BattleScribeModifier";
import { BattleScribeModifierGroup } from "./BattleScribeModifierGroup";

/**
 * Represents a group of units, for example:
 * - A brigade
 * - a platoon
 * Which usually is what configures how many units you can put into your army
 */
export class BattleScribeForceEntry extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean,
        public modifiers: Maybe<Array<BattleScribeModifier>>,
        public categoryLinks: Maybe<Array<BattleScribeCategoryLink>>,
        public forceEntries: Maybe<Array<BattleScribeForceEntry>>
    ){
        super(id,name)
    }

    static fromXMLNode(xmlNode: XML): BattleScribeForceEntry {

        return new BattleScribeForceEntry(
            xmlNode.getProperty("id"),
            xmlNode.getProperty("name"),
            getBool("hidden",xmlNode),
            getOptionalArray("modifiers",xmlNode,BattleScribeModifier.fromXMLNode),
            getOptionalArray("categoryLinks",xmlNode,BattleScribeCategoryLink.fromXMLNode),
            getOptionalArray("forceEntries",xmlNode,BattleScribeForceEntry.fromXMLNode)
        )
    }
}