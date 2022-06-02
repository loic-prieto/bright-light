import { BattleScribeEntity } from "./BattleScribeEntity";
import { getBool } from "../../../../util/sxml-utils";
import { XML } from "sxml";

export class BattleScribeCostType extends BattleScribeEntity {
  constructor(
    id: string,
    name: string,
    public hidden: boolean,
    public defaultCostLimit: string
  ) {
    super(id, name);
  }

  static fromXMLNode(xmlDocument: XML): BattleScribeCostType {
    return new BattleScribeCostType(
      xmlDocument.getProperty("id"),
      xmlDocument.getProperty("name"),
      getBool("name", xmlDocument),
      xmlDocument.getProperty("defaultCostLimit")
    );
  }
}
