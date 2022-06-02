import { Maybe } from 'purify-ts';
import { getOptionalArray } from 'src/app/util/sxml-utils';
import { XML } from 'sxml';
import { BattleScribeCondition } from './BattleScribeCondition';
import { BattleScribeConditionGroup } from './BattleScribeConditionGroup';
import { BattleScribeRepeat } from './BattleScribeRepeat';

export class BattleScribeModifier {
  constructor(
    public type: string,
    public field: string,
    public value: string,
    public conditions: Maybe<Array<BattleScribeCondition>>,
    public conditionGroups: Maybe<Array<BattleScribeConditionGroup>>,
    public repeats: Maybe<Array<BattleScribeRepeat>>,
  ) {}

  static fromXMLNode(xmlNode: XML): BattleScribeModifier {
    return new BattleScribeModifier(
      xmlNode.getProperty('type'),
      xmlNode.getProperty('field'),
      xmlNode.getProperty('value'),
      getOptionalArray(
        'conditions',
        xmlNode,
        BattleScribeCondition.fromXMLNode,
      ),
      getOptionalArray(
        'conditionGroups',
        xmlNode,
        BattleScribeConditionGroup.fromXMLNode,
      ),
      getOptionalArray('repeats', xmlNode, BattleScribeRepeat.fromXMLNode),
    );
  }
}
