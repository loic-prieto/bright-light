import { getBool } from 'src/app/util/sxml-utils';
import { XML } from 'sxml';

export class BattleScribeConstraint {
  constructor(
    public id: string,
    public field: string,
    public scope: string,
    public value: string,
    public percentValue: boolean,
    public shared: boolean,
    public includeChildSelections: boolean,
    public includeChildForces: boolean,
    public type: string,
  ) {}

  static fromXMLNode(xmlDocument: XML): BattleScribeConstraint {
    return new BattleScribeConstraint(
      xmlDocument.getProperty('id'),
      xmlDocument.getProperty('field'),
      xmlDocument.getProperty('scope'),
      xmlDocument.getProperty('value'),
      getBool('percentValue', xmlDocument),
      getBool('shared', xmlDocument),
      getBool('includeChildSelections', xmlDocument),
      getBool('includeChildForces', xmlDocument),
      xmlDocument.getProperty('type'),
    );
  }
}
