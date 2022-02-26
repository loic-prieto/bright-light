import { getBool } from "src/app/util/sxml-utils";
import { XML } from "sxml";
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

    static fromXMLNode(xmlNode: XML): BattleScribeCategoryLink {
        
        return new BattleScribeCategoryLink(
            xmlNode.getProperty("id"),
            xmlNode.getProperty("name"),
            getBool("hidden",xmlNode),
            xmlNode.getProperty("targetId"),
            getBool("primary",xmlNode)
        )
    }
}