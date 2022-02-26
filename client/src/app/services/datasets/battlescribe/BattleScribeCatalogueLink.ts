import { getBool } from "src/app/util/sxml-utils";
import { XML } from "sxml";
import { BattleScribeEntity } from "./BattleScribeEntity";

export class BattleScribeCatalogueLink extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public targetId: string,
        public type: string,
        public importRootEntries: boolean
    ){
        super(id,name)
    }

    static fromXMLNode(xmlNode: XML): BattleScribeCatalogueLink {
        
        return new BattleScribeCatalogueLink(
            xmlNode.getProperty("id"),
            xmlNode.getProperty("name"),
            xmlNode.getProperty("targetId"),
            xmlNode.getProperty("type"),
            getBool("importRootEntries",xmlNode)
        )
    }
}