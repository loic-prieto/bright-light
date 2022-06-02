import { Maybe } from 'purify-ts';
import { getBool, getOptionalArray } from 'src/app/util/sxml-utils';
import { XML } from 'sxml';
import { BattleScribeCharacteristic } from './BattleScribeCharacteristic';
import { BattleScribeEntity } from './BattleScribeEntity';
import { BattleScribeModifierGroup } from './BattleScribeModifierGroup';

export class BattleScribeProfile extends BattleScribeEntity {
  constructor(
    id: string,
    name: string,
    public publicationId: string,
    public hidden: boolean,
    public typeId: string,
    public typeName: string,
    public modifierGroups: Maybe<Array<BattleScribeModifierGroup>>,
    public characteristics: Maybe<Array<BattleScribeCharacteristic>>,
  ) {
    super(id, name);
  }

  static fromXMLNode(xmlDocument: XML): BattleScribeProfile {
    return new BattleScribeProfile(
      xmlDocument.getProperty('id'),
      xmlDocument.getProperty('name'),
      xmlDocument.getProperty('publicationId'),
      getBool('hidden', xmlDocument),
      xmlDocument.getProperty('typeId'),
      xmlDocument.getProperty('typeName'),
      getOptionalArray(
        'modifierGroups',
        xmlDocument,
        BattleScribeModifierGroup.fromXMLNode,
      ),
      getOptionalArray(
        'characteristics',
        xmlDocument,
        BattleScribeCharacteristic.fromXMLNode,
      ),
    );
  }
}
