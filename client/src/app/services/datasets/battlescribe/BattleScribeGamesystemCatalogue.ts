import {BattleScribeCategoryEntry} from "./BattleScribeCategoryEntry"
import {BattleScribeEntity} from "./BattleScribeEntity"
import {BattleScribeEntryLink} from "./BattleScribeEntryLink"
import {BattleScribeProfileType} from "./BattleScribeProfileType"
import {BattleScribePublication} from "./BattleScribePublication"
import {BattleScribeRule} from "./BattleScribeRule"
import {BattleScribeSelectionEntry} from "./BattleScribeSelectionEntry"
import {BattleScribeSelectionEntryGroup} from "./BattleScribeSelectionEntryGroup"
import {XML} from 'sxml'
import {Either, Maybe} from "purify-ts"
import {getBool, getNumber, getOptional, getOptionalArray} from "src/app/util/sxml-utils"
import {BattleScribeCostType} from "./BattleScribeCostType";
import {BattleScribeForceEntry} from "./BattleScribeForceEntry";

/**
 * Represents a Battlescribe Catalogue
 */
export class BattleScribeGamesystemCatalogue extends BattleScribeEntity {
    constructor(
        id: string,
        name: string,
        public revision: number,
        public battleScribeVersion: string,
        public authorName: Maybe<string>,
        public authorContact: Maybe<string>,
        public authorUrl: Maybe<string>,
        public library: boolean,
        public gameSystemId: string,
        public gameSystemRevision: number,
        public publications: Maybe<Array<BattleScribePublication>>,
        public costTypes: Maybe<Array<BattleScribeCostType>>,
        public profileTypes: Maybe<Array<BattleScribeProfileType>>,
        public categoryEntries: Maybe<Array<BattleScribeCategoryEntry>>,
        public forceEntries: Maybe<Array<BattleScribeForceEntry>>,
        public entryLinks: Maybe<Array<BattleScribeEntryLink>>,
        public sharedSelectionEntries: Maybe<Array<BattleScribeSelectionEntry>>,
        public sharedSelectionEntryGroups: Maybe<Array<BattleScribeSelectionEntryGroup>>,
        public sharedRules: Maybe<Array<BattleScribeRule>>,
        public sharedProfiles: Maybe<Array<BattleScribeProfileType>>
    ) {
        super(id, name)
    }

    static fromString(xmlDocument: string): Either<Error, BattleScribeGamesystemCatalogue> {
        return Either.encase(() => {
            const rootCatalogue: XML = new XML(xmlDocument)

            return new BattleScribeGamesystemCatalogue(
                rootCatalogue.getProperty("id"),
                rootCatalogue.getProperty("name"),
                getNumber("revision", rootCatalogue),
                rootCatalogue.getProperty("battleScribeVersion"),
                getOptional("authorName", rootCatalogue),
                getOptional("authorContact", rootCatalogue),
                getOptional("authorUrl", rootCatalogue),
                getBool("library", rootCatalogue),
                rootCatalogue.getProperty("gameSystemId"),
                getNumber("gameSystemRevision", rootCatalogue),
                getOptionalArray("publications", rootCatalogue, BattleScribePublication.fromXMLNode),
                getOptionalArray("costTypes", rootCatalogue, BattleScribeCostType.fromXMLNode),
                getOptionalArray("profileTypes", rootCatalogue, BattleScribeProfileType.fromXMLNode),
                getOptionalArray("categoryEntries", rootCatalogue, BattleScribeCategoryEntry.fromXMLNode),
                getOptionalArray("forceEntries",rootCatalogue,BattleScribeForceEntry.fromXMLNode),
                getOptionalArray("entryLinks", rootCatalogue, BattleScribeEntryLink.fromXMLNode),
                getOptionalArray("sharedSelectionEntries", rootCatalogue, BattleScribeSelectionEntry.fromXMLNode),
                getOptionalArray("sharedSelectionEntryGroups", rootCatalogue, BattleScribeSelectionEntryGroup.fromXMLNode),
                getOptionalArray("sharedRules", rootCatalogue, BattleScribeRule.fromXMLNode),
                getOptionalArray("sharedProfiles", rootCatalogue, BattleScribeProfileType.fromXMLNode)
            )
        })
    }
}
