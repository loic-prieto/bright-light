import { XML } from 'sxml';
import { BattleScribeEntity } from './BattleScribeEntity';
import { getBool } from '../../../util/sxml-utils';

export class BattleScribeCostType extends BattleScribeEntity {
  constructor(
    id: string,
    name: string,
    public hidden: boolean,
    public defaultCostLimit: string,
  ) {
    super(id, name);
  }

  static fromXMLNode(xmlDocument: XML): BattleScribeCostType {
    return new BattleScribeCostType(
      xmlDocument.getProperty('id'),
      xmlDocument.getProperty('name'),
      getBool('name', xmlDocument),
      xmlDocument.getProperty('defaultCostLimit'),
    );
  }
}
