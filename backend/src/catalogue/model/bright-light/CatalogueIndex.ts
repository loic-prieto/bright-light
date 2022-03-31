import { CatalogueIndexEntry } from "src/model/bright-light/CatalogueIndexEntry"

export class CatalogueIndex {
	constructor(
		public name: string,
		public entries: Array<CatalogueIndexEntry>
	){}

	static fromBSIndex(bsIndex: BattleScribeIndex): CatalogueIndex {
		return new CatalogueIndex(
			bsIndex.name,
			bsIndex.dataIndexEntries.map(CatalogueIndexEntry.fromBSIndexEntry)
		)
	}
}
