import { XML } from 'sxml';

export class BattleScribeCost {
  constructor(
    public name: string,
    public typeId: string,
    public value: string,
  ) {}

  static fromXMLNode(xmlDocument: XML): BattleScribeCost {
    return new BattleScribeCost(
      xmlDocument.getProperty('name'),
      xmlDocument.getProperty('typeId'),
      xmlDocument.getProperty('value'),
    );
  }
}
