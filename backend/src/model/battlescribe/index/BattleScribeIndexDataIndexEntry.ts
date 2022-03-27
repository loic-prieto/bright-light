import { XML} from 'sxml'
import {Either } from "purify-ts"

/**
 * Represents a Battlescribe Catalogue
 */
export class BattleScribeIndexDataIndexEntry {
    constructor(
        public id: string,
        public name: string,
        public revision: string,
        public filePath: string,
        public type: DataIndexEntryType
    ){}

    static fromString(xmlDocument: string): Either<Error,BattleScribeIndexDataIndexEntry> {
        return Either.encase(()=>{
            const rootIndex: XML = new XML(xmlDocument)

            return new BattleScribeIndexDataIndexEntry (
                rootCatalogue.getProperty("dataId"),
                rootCatalogue.getProperty("dataName"),
                rootCatalogue.getProperty("dataRevision"),
                rootCatalogue.getProperty("filePath"),
                rootCatalogue.getProperty("dataType")
            )
        })
    } 
}

export type DataIndexEntryType = 'catalogue' | 'gamesystem'
