import {XML} from "sxml";
import {getBool, getNumber} from "../../../util/sxml-utils";

export class BattleScribeRepeat {
    constructor(
        public field: string,
        public scope: string,
        public value: string,
        public percentValue: string,
        public shared: boolean,
        public includeChildSelections: boolean,
        public includeChildForces: boolean,
        public childId: string,
        public repeats: number,
        public roundUp: boolean
    ) {}

    static fromXMLNode(xmlNode: XML): BattleScribeRepeat {

        return new BattleScribeRepeat(
            xmlNode.getProperty("field"),
            xmlNode.getProperty("scope"),
            xmlNode.getProperty("value"),
            xmlNode.getProperty("percentValue"),
            getBool("shared",xmlNode),
            getBool("includeChildSelections",xmlNode),
            getBool("includeChildForces",xmlNode),
            xmlNode.getProperty("childId"),
            getNumber("repeats",xmlNode),
            getBool("roundUp",xmlNode)
        )
    }

}