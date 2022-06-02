import { Maybe } from 'purify-ts';
import { getBool, getOptionalArray } from 'src/app/util/sxml-utils';
import { XML } from 'sxml';
import { BattleScribeCategoryLink } from './BattleScribeCategoryLink';
import { BattleScribeEntity } from './BattleScribeEntity';
import { BattleScribeModifier } from './BattleScribeModifier';
import { BattleScribeModifierGroup } from './BattleScribeModifierGroup';

/**
 * I don't know what this represents
 */
export class BattleScribeEntryLink extends BattleScribeEntity {
  constructor(
    id: string,
    name: string,
    public hidden: boolean,
    public collective: boolean,
    public importTag: boolean,
    public targetId: string,
    public type: string,
    public modifiers: Maybe<Array<BattleScribeModifier>>,
    public categoryLinks: Maybe<Array<BattleScribeCategoryLink>>,
    public modifierGroups: Maybe<Array<BattleScribeModifierGroup>>,
  ) {
    super(id, name);
  }

  static fromXMLNode(xmlNode: XML): BattleScribeEntryLink {
    return new BattleScribeEntryLink(
      xmlNode.getProperty('id'),
      xmlNode.getProperty('name'),
      getBool('hidden', xmlNode),
      getBool('collective', xmlNode),
      getBool('import', xmlNode),
      xmlNode.getProperty('targetId'),
      xmlNode.getProperty('type'),
      getOptionalArray('modifiers', xmlNode, BattleScribeModifier.fromXMLNode),
      getOptionalArray(
        'categoryLinks',
        xmlNode,
        BattleScribeCategoryLink.fromXMLNode,
      ),
      getOptionalArray(
        'modifierGroups',
        xmlNode,
        BattleScribeModifierGroup.fromXMLNode,
      ),
    );
  }
}
