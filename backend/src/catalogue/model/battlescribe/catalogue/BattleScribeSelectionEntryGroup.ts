import { Maybe } from 'purify-ts';
import { getBool, getOptionalArray } from 'src/app/util/sxml-utils';
import { XML } from 'sxml';
import { BattleScribeConstraint } from './BattleScribeConstraint';
import { BattleScribeEntity } from './BattleScribeEntity';
import { BattleScribeEntryLink } from './BattleScribeEntryLink';
import { BattleScribeModifier } from './BattleScribeModifier';

export class BattleScribeSelectionEntryGroup extends BattleScribeEntity {
  constructor(
    id: string,
    name: string,
    public hidden: boolean,
    public collective: boolean,
    public importTag: boolean,
    public defaultSelectionEntryId: string,
    public modifiers: Maybe<Array<BattleScribeModifier>>,
    public constraints: Maybe<Array<BattleScribeConstraint>>,
    public entryLinks: Maybe<Array<BattleScribeEntryLink>>,
  ) {
    super(id, name);
  }

  static fromXMLNode(xmlDocument: XML): BattleScribeSelectionEntryGroup {
    return new BattleScribeSelectionEntryGroup(
      xmlDocument.getProperty('id'),
      xmlDocument.getProperty('name'),
      getBool('hidden', xmlDocument),
      getBool('collective', xmlDocument),
      getBool('import', xmlDocument),
      xmlDocument.getProperty('defaultSelectionEntryId'),
      getOptionalArray(
        'modifiers',
        xmlDocument,
        BattleScribeModifier.fromXMLNode,
      ),
      getOptionalArray(
        'constraints',
        xmlDocument,
        BattleScribeConstraint.fromXMLNode,
      ),
      getOptionalArray(
        'entryLinks',
        xmlDocument,
        BattleScribeEntryLink.fromXMLNode,
      ),
    );
  }
}
