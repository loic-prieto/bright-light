import { XML } from 'sxml';
import { BattleScribeEntity } from './BattleScribeEntity';

/**
 * Represents a BattleScribe concept that can be quantified and linked to
 * higher order concepts.
 * For example, We can have a "Dice Roll" concept which is the dice result needed
 * for an "Explosion" concept to trigger. Dice Roll is the Characteristic Type, and
 * Explosion is the ProfileType.
 */
export class BattleScribeCharacteristicType extends BattleScribeEntity {
  static fromXMLNode(xmlNode: XML): BattleScribeCharacteristicType {
    return new BattleScribeCharacteristicType(
      xmlNode.getProperty('id'),
      xmlNode.getProperty('name'),
    );
  }
}
