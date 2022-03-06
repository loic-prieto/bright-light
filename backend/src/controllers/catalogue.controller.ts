import {Controller, Get, HttpStatus} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import JSZip from "jszip";
import {Catalogue} from "../model/Catalogue";
import {XML} from "sxml";

const zip = require("jszip")

@Controller()
export class CatalogueController {
    static BS_DATA_INDEX = "https://battlescribedata.appspot.com/repos/wh40k/index.bsi"

    constructor(private readonly httpClient: HttpService) {}

    @Get("/catalogues")
    async getCatalogueList(): Promise<Array<Catalogue>> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(CatalogueController.BS_DATA_INDEX,{responseType:"arraybuffer",responseEncoding:"binary"}).subscribe(
                indexResponse => {
                    if (indexResponse.status != HttpStatus.OK) {
                        reject(`Could not download the BS catalogue index file: ${indexResponse.status} - ${indexResponse.data}`)
                    } else {
                        resolve(indexResponse.data)
                    }
                })
        })
            .then(zip.loadAsync)
            .then((zipFile: JSZip) => zipFile.file("index.xml").async("string"))
            .then((indexXMLContent)=>{
                const rootNode: XML = new XML(indexXMLContent)
                return [...rootNode.get("dataIndexEntries").at(0).get("dataIndexEntry")].map(Catalogue.fromNode)
            })
    }
}
