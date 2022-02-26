import { BattleScribeCatalogueLink } from "./BattleScribeCatalogueLink"
import { BattleScribeCategoryEntry } from "./BattleScribeCategoryEntry"
import { BattleScribeEntity } from "./BattleScribeEntity"
import { BattleScribeEntryLink } from "./BattleScribeEntryLink"
import { BattleScribeInfoLink } from "./BattleScribeInfoLink"
import { BattleScribeProfileType } from "./BattleScribeProfileType"
import { BattleScribePublication } from "./BattleScribePublication"
import { BattleScribeRule } from "./BattleScribeRule"
import { BattleScribeSelectionEntry } from "./BattleScribeSelectionEntry"
import { BattleScribeSelectionEntryGroup } from "./BattleScribeSelectionEntryGroup"
import { XML,XMLList } from 'sxml'
import { Maybe } from "purify-ts"
import { getBool, getNumber, getOptionalArray } from "src/app/util/sxml-utils"

/**
 * Represents a Battlescribe Catalogue
 */
export class BattleScribeCatalogue extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public revision: number,
        public battleScribeVersion: string,
        public authorName: string,
        public authorContact: string,
        public authorUrl: string,
        public library: boolean,
        public gameSystemId: string,
        public gameSystemRevision: number,
        public publications: Maybe<Array<BattleScribePublication>>,
        public profileTypes: Maybe<Array<BattleScribeProfileType>>,
        public categoryEntries: Maybe<Array<BattleScribeCategoryEntry>>,
        public entryLinks: Maybe<Array<BattleScribeEntryLink>>,
        public infoLinks: Maybe<Array<BattleScribeInfoLink>>,
        public sharedSelectionEntries: Maybe<Array<BattleScribeSelectionEntry>>,
        public sharedSelectionEntryGroups: Maybe<Array<BattleScribeSelectionEntryGroup>>,
        public sharedRules: Maybe<Array<BattleScribeRule>>,
        public sharedProfiles: Maybe<Array<BattleScribeProfileType>>,
        public catalogueLinks: Maybe<Array<BattleScribeCatalogueLink>>
    ){
        super(id,name)
    }

    static fromString(xmlDocument: string): BattleScribeCatalogue {
        const rootCatalogue: XML = new XML(xmlDocument)
        
        return new BattleScribeCatalogue(
            rootCatalogue.getProperty("id"),
            rootCatalogue.getProperty("name"),
            getNumber("revision",rootCatalogue),
            rootCatalogue.getProperty("battleScribeVersion"),
            rootCatalogue.getProperty("authorName"),
            rootCatalogue.getProperty("authorContact"),
            rootCatalogue.getProperty("authorUrl"),
            getBool("library",rootCatalogue),
            rootCatalogue.getProperty("gameSystemId"),
            getNumber("gameSystemRevision",rootCatalogue),
            getOptionalArray("publications",rootCatalogue,BattleScribePublication.fromXMLNode),
            getOptionalArray("profileTypes",rootCatalogue,BattleScribeProfileType.fromXMLNode),
            getOptionalArray("categoryEntries",rootCatalogue,BattleScribeCategoryEntry.fromXMLNode),
            getOptionalArray("entryLinks",rootCatalogue,BattleScribeEntryLink.fromXMLNode),
            getOptionalArray("infoLinks",rootCatalogue,BattleScribeInfoLink.fromXMLNode),
            getOptionalArray("sharedSelectionEntries",rootCatalogue,BattleScribeSelectionEntry.fromXMLNode),
            getOptionalArray("sharedSelectionEntryGroups",rootCatalogue,BattleScribeSelectionEntryGroup.fromXMLNode),
            getOptionalArray("sharedRules",rootCatalogue,BattleScribeRule.fromXMLNode),
            getOptionalArray("sharedProfiles",rootCatalogue,BattleScribeProfileType.fromXMLNode),
            getOptionalArray("catalogueLinks",rootCatalogue,BattleScribeCatalogueLink.fromXMLNode)
        )
        
    } 
}

