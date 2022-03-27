import { XML } from "sxml";

export class BattleScribeCharacteristic {
    constructor(
        public name: string,
        public typeId: string,
        public value: string
    ){}

    static fromXMLNode(xmlDocument: XML): BattleScribeCharacteristic {
        return new BattleScribeCharacteristic(
            xmlDocument.getProperty("name"),
            xmlDocument.getProperty("typeId"),
            xmlDocument.getProperty("value")
        )
    } 
}