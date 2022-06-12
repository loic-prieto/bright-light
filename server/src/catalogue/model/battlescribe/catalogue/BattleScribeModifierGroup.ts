import { Maybe } from "purify-ts";
import { getOptionalArray } from "../../../../util/sxml-utils";
import { XML } from "sxml";
import { BattleScribeCondition } from "./BattleScribeCondition";
import { BattleScribeModifier } from "./BattleScribeModifier";

export class BattleScribeModifierGroup {
  constructor(
    public conditions: Maybe<Array<BattleScribeCondition>>,
    public modifiers: Maybe<Array<BattleScribeModifier>>
  ) {}

  static fromXMLNode(xmlNode: XML): BattleScribeModifierGroup {
    return new BattleScribeModifierGroup(
      getOptionalArray(
        "conditions",
        xmlNode,
        BattleScribeCondition.fromXMLNode
      ),
      getOptionalArray("modifiers", xmlNode, BattleScribeModifier.fromXMLNode)
    );
  }
}
