import { getBool } from 'src/app/util/sxml-utils';
import { XML } from 'sxml';

export class BattleScribeCondition {
  constructor(
    public field: string,
    public scope: string,
    public value: string,
    public percentValue: boolean,
    public shared: boolean,
    public includeChildSelections: boolean,
    public includeChildForces: boolean,
    public childId: string,
    public type: string,
  ) {}

  static fromXMLNode(xmlNode: XML): BattleScribeCondition {
    return new BattleScribeCondition(
      xmlNode.getProperty('field'),
      xmlNode.getProperty('scope'),
      xmlNode.getProperty('value'),
      getBool('percentValue', xmlNode),
      getBool('shared', xmlNode),
      getBool('includeChildSelections', xmlNode),
      getBool('includeChildForces', xmlNode),
      xmlNode.getProperty('childId'),
      xmlNode.getProperty('type'),
    );
  }
}
