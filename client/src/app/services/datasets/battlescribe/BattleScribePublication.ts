import { XML } from "sxml";
import { BattleScribeEntity } from "./BattleScribeEntity";

/**
 * Represents a BattleScribe publication element in a catalogue.
 * This is a book related to the catalogue.
 * For example, for the zealous robots, there is the rules book and then
 * other publications that expand upon those rules.
 */
export class BattleScribePublication extends BattleScribeEntity {
    static fromXMLNode(node: XML): BattleScribePublication {
        return new BattleScribePublication(
            node.getProperty("id"),
            node.getProperty("name"))
    }
}