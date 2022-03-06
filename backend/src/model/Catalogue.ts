import {XML} from "sxml";

export class Catalogue {
    constructor(
        private id: string,
        private name: string,
        private filePath: string,
        private revision: string) {}

    static fromNode(xmlNode: XML) {
        return new Catalogue(
            xmlNode.getProperty("dataId"),
            xmlNode.getProperty("dataName"),
            xmlNode.getProperty("filePath"),
            xmlNode.getProperty("dataRevision")
        )
    }

}