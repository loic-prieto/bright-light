import { Maybe } from "purify-ts";
import {
  getBool,
  getNumber,
  getOptionalArray,
} from "../../../../util/sxml-utils";
import { XML } from "sxml";
import { BattleScribeCategoryLink } from "./BattleScribeCategoryLink";
import { BattleScribeConstraint } from "./BattleScribeConstraint";
import { BattleScribeCost } from "./BattleScribeCost";
import { BattleScribeEntity } from "./BattleScribeEntity";
import { BattleScribeEntryLink } from "./BattleScribeEntryLink";
import { BattleScribeInfoLink } from "./BattleScribeInfoLink";
import { BattleScribeModifier } from "./BattleScribeModifier";
import { BattleScribeProfile } from "./BattleScribeProfile";
import { BattleScribeSelectionEntryGroup } from "./BattleScribeSelectionEntryGroup";

/**
 * This class seems to represent units or weapons.
 * More specifically: Units = Selection entry of type model
 */
export class BattleScribeSelectionEntry extends BattleScribeEntity {
  constructor(
    id: string,
    name: string,
    public publicationId: string,
    public page: number,
    public hidden: boolean,
    public collective: boolean,
    public importTag: boolean,
    public type: string,
    public modifiers: Maybe<Array<BattleScribeModifier>>,
    public constraints: Maybe<Array<BattleScribeConstraint>>,
    public profiles: Maybe<Array<BattleScribeProfile>>,
    public infoLinks: Maybe<Array<BattleScribeInfoLink>>,
    public categoryLinks: Maybe<Array<BattleScribeCategoryLink>>,
    public selectionEntryGroups: Maybe<Array<BattleScribeSelectionEntryGroup>>,
    public entryLinks: Maybe<Array<BattleScribeEntryLink>>,
    public costs: Maybe<Array<BattleScribeCost>>
  ) {
    super(id, name);
  }

  static fromXMLNode(xmlDocument: XML): BattleScribeSelectionEntry {
    return new BattleScribeSelectionEntry(
      xmlDocument.getProperty("id"),
      xmlDocument.getProperty("name"),
      xmlDocument.getProperty("publicationId"),
      getNumber("page", xmlDocument),
      getBool("hidden", xmlDocument),
      getBool("collective", xmlDocument),
      getBool("import", xmlDocument),
      xmlDocument.getProperty("type"),
      getOptionalArray(
        "modifiers",
        xmlDocument,
        BattleScribeModifier.fromXMLNode
      ),
      getOptionalArray(
        "constraints",
        xmlDocument,
        BattleScribeConstraint.fromXMLNode
      ),
      getOptionalArray(
        "profiles",
        xmlDocument,
        BattleScribeProfile.fromXMLNode
      ),
      getOptionalArray(
        "infoLinks",
        xmlDocument,
        BattleScribeInfoLink.fromXMLNode
      ),
      getOptionalArray(
        "categoryLinks",
        xmlDocument,
        BattleScribeCategoryLink.fromXMLNode
      ),
      getOptionalArray(
        "selectionEntryGroups",
        xmlDocument,
        BattleScribeSelectionEntryGroup.fromXMLNode
      ),
      getOptionalArray(
        "entryLinks",
        xmlDocument,
        BattleScribeEntryLink.fromXMLNode
      ),
      getOptionalArray("costs", xmlDocument, BattleScribeCost.fromXMLNode)
    );
  }
}
