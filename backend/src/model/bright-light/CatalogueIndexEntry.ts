export class CatalogueIndexEntry {
	constructor(
		public name: string,
		public revision: string
	){}
	
	static fromBSIndexEntry(dataEntry: BattleScribeIndexDataIndexEntry): CatalogueIndexEntry {
		return new CatalogueIndexEntry(
			dataEntry.name,
			dataEntry.revision
		)
	}
}
