import { getBool } from "src/app/util/sxml-utils";
import { XML } from "sxml";
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

    static fromXMLNode(xmlNode: XML): BattleScribeInfoLink {
        
        return new BattleScribeInfoLink(
            xmlNode.getProperty("id"),
            xmlNode.getProperty("name"),
            getBool("hidden",xmlNode),
            xmlNode.getProperty("targetId"),
            xmlNode.getProperty("type")
        )
    }
}