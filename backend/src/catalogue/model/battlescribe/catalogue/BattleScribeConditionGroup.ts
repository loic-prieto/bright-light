import { Maybe } from "purify-ts";
import { getOptionalArray } from "../../../../util/sxml-utils";
import { XML } from "sxml";
import { BattleScribeCondition } from "./BattleScribeCondition";

export class BattleScribeConditionGroup {
  constructor(
    public type: string,
    public conditionGroups: Maybe<Array<BattleScribeConditionGroup>>,
    public conditions: Maybe<Array<BattleScribeCondition>>
  ) {}

  static fromXMLNode(xmlNode: XML): BattleScribeConditionGroup {
    return new BattleScribeConditionGroup(
      xmlNode.getProperty("type"),
      getOptionalArray(
        "conditionGroups",
        xmlNode,
        BattleScribeConditionGroup.fromXMLNode
      ),
      getOptionalArray("conditions", xmlNode, BattleScribeCondition.fromXMLNode)
    );
  }
}
