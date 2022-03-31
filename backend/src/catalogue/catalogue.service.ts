import {HttpStatus} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { EitherAsync } from 'purify-ts/EitherAsync'
import { EitherAsync } from 'purify-ts/EitherAsync'
import {HttpService} from "@nestjs/axios";
import JSZip from "jszip";
import {XML} from "sxml";
const zip = require("jszip")
import {BattleScribeIndex} from "./model/battlescribe/index/BattleScribeIndex"
import { CatalogueIndex } from "./model/bright-light/CatalogueIndex"


@Injectable()
export class CatalogueService {

    static BS_DATA_INDEX = "https://battlescribedata.appspot.com/repos/wh40k/index.bsi"

	constructor(private readonly httpClient: HttpService) {}
  
	getCatalogueList(): EitherAsync<Error,CatalogueIndex> {
		return EitherAsync<Error,CatalogueIndex>(async (liftEither,fromPromise,throwE)=>{
			const value = await fromPromise(new Promise<Error,CatalogueIndex>((resolve,reject)=>{
				this.httpClient.get(CatalogueService.BS_DATA_INDEX,{responseType:"arraybuffer",responseEncoding:"binary"}).subscribe(
					indexResponse => {	
						if (indexResponse.status != HttpStatus.OK) {
							reject(`Could not download the BS catalogue index file: ${indexResponse.status} - ${indexResponse.data}`)
						} else {
							resolve(indexResponse.data)
						}
					})
				})
					// This is applied in the promise
					.then(zip.loadAsync)
					.then((zipFile: JSZip) => zipFile.file("index.xml").async("string"))
					.then((indexXMLContent)=> BattleScribeIndex.fromString(indexXMLContent)
							.ifLeft((error)=>{throw error})
							.map(CatalogueIndex.fromBSIndex)
							.unsafeCoerce()))
		})
	}
	
	getCatalogue(): EitherAsync<Error,CatalogueIndex> {
		return 'Hi there!'
	}
}
