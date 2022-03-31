import { XML} from 'sxml'
import {Either, Maybe } from "purify-ts"
import { getOptionalArray } from "src/util/sxml-utils"
import { BattleScribeIndexDataIndexEntry } from "src/model/battlescribe/index/BattleScribeIndexDataIndexEntry"

/**
 * Represents a Battlescribe Catalogue
 */
export class BattleScribeIndex {
    constructor(
        public name: string,
        public dataIndexEntries: Maybe<Array<BattleScribeIndexDataIndexEntry>>
    ){}

    static fromString(xmlDocument: string): Either<Error,BattleScribeIndex> {
        return Either.encase(()=>{
            const rootIndex: XML = new XML(xmlDocument)

            return new BattleScribeIndex(
                rootCatalogue.getProperty("name"),
                getOptionalArray("dataIndexEntry ",rootCatalogue,BattleScribeIndexDataEntry.fromXMLNode),
            )
        })
    } 
}

