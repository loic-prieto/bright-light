import { getBool } from 'src/app/util/sxml-utils';
import { XML } from 'sxml';
import { BattleScribeEntity } from './BattleScribeEntity';

/**
 * A unit can belong to several categories, and one of them is the primary one,
 * meaning than when shown on a list, the primary one is the one it belongs to, visually,
 * over others.
 * For example, a commander may have an "HQ" category which is primary, and also a "Character" category,
 * which is secondary.
 */
export class BattleScribeCategoryLink extends BattleScribeEntity {
  constructor(
    id: string,
    name: string,
    public hidden: boolean,
    public targetId: string,
    public primary: boolean,
  ) {
    super(id, name);
  }

  static fromXMLNode(xmlNode: XML): BattleScribeCategoryLink {
    return new BattleScribeCategoryLink(
      xmlNode.getProperty('id'),
      xmlNode.getProperty('name'),
      getBool('hidden', xmlNode),
      xmlNode.getProperty('targetId'),
      getBool('primary', xmlNode),
    );
  }
}
