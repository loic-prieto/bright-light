import { Maybe } from "purify-ts";
import { getBool, getNumber, getOptionalArray } from "src/app/util/sxml-utils";
import { XML } from "sxml";
import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeModifier } from "./BattleScribeModifier";

export class BattleScribeRule extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public hidden: boolean,
        public publicationId: string,
        public page: number,
        public modifiers: Maybe<Array<BattleScribeModifier>>,
        public description: string,
    ){
        super(id,name)
    }

    static fromXMLNode(xmlNode: XML): BattleScribeRule {

        return new BattleScribeRule(
            xmlNode.getProperty("id"),
            xmlNode.getProperty("name"),
            getBool("hidden",xmlNode),
            xmlNode.getProperty("publicationId"),
            getNumber("page",xmlNode),
            getOptionalArray("modifiers",xmlNode,BattleScribeModifier.fromXMLNode),
            xmlNode.getProperty("description")
        )
    }
}