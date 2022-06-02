import { XML } from 'sxml';
import { Either, Maybe } from 'purify-ts';
import { getOptionalArray } from '../../../../util/sxml-utils';
import { BattleScribeIndexDataIndexEntry } from './BattleScribeIndexDataIndexEntry';
import { CatalogueIndex } from 'bright-light-common';

/**
 * Represents a Battlescribe Index that lists all available catalogues for a game system
 */
export class BattleScribeIndex {
  constructor(
    public name: string,
    public dataIndexEntries: Maybe<Array<BattleScribeIndexDataIndexEntry>>,
  ) {}

  static fromString(xmlDocument: string): Either<Error, BattleScribeIndex> {
    return Either.encase(() => {
      const rootIndex: XML = new XML(xmlDocument);

      return new BattleScribeIndex(
        rootIndex.getProperty('name'),
        getOptionalArray(
          'dataIndexEntry ',
          rootIndex,
          BattleScribeIndexDataIndexEntry.fromXMLNode,
        ),
      );
    });
  }

  toCatalogueIndex(): Either<Error, CatalogueIndex> {
    return Either.encase(() => {
      return new CatalogueIndex(
        this.name,
        this.dataIndexEntries
          .map((entries) =>
            entries.map((entry) => entry.toCatalogueIndexEntry()),
          )
          .orDefault([]),
      );
    });
  }
}
