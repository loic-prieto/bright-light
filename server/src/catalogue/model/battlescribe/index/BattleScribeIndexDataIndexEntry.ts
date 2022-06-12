import { XML } from 'sxml';
import { CatalogueIndexEntry } from 'bright-light-common';

/**
 * Represents a Battlescribe Catalogue
 */
export class BattleScribeIndexDataIndexEntry {
  constructor(
    public id: string,
    public name: string,
    public revision: string,
    public filePath: string,
    public type: DataIndexEntryType,
  ) {}

  static fromXMLNode(node: XML): BattleScribeIndexDataIndexEntry {
    return new BattleScribeIndexDataIndexEntry(
      node.getProperty('dataId'),
      node.getProperty('dataName'),
      node.getProperty('dataRevision'),
      node.getProperty('filePath'),
      node.getProperty('dataType') as DataIndexEntryType,
    );
  }

  toCatalogueIndexEntry(): CatalogueIndexEntry {
    return new CatalogueIndexEntry(this.name, this.revision);
  }
}

export type DataIndexEntryType = 'catalogue' | 'gamesystem';
