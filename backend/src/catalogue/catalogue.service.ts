import {HttpStatus} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from 'purify-ts/Either'
import { map, catchError } from 'rxjs/operators';
import {HttpService} from "@nestjs/axios";
import JSZip from "jszip";
const zip = require("jszip")
import {BattleScribeIndex} from "./model/battlescribe/index/BattleScribeIndex"
import { CatalogueIndex } from "./model/bright-light/CatalogueIndex"

@Injectable()
export class CatalogueService {

    static BS_DATA_INDEX = "https://battlescribedata.appspot.com/repos/wh40k/index.bsi"

	constructor(private readonly httpClient: HttpService) {}
  
	getCatalogueList(): Observable<Either<Error,CatalogueIndex>> {
		return this.httpClient.get(CatalogueService.BS_DATA_INDEX,{responseType:"arraybuffer",responseEncoding:"binary"})
            .pipe(
				catchError(error=> Left(new Error(error))),
                map(response=>{
                    let result: Either<Error,ArrayBuffer>
                    if(response.status == HttpStatus.OK) {
                        result = Right(response.data)
                    } else {
                        result = Left(new Error(`There was an error while retrieving the catalogue index: ${response.status}-${response.}`))
                    }
					return result
                })
			)
			.pipe(concatMap((rawResult: Either<Error,ArrayBuffer>){
				return rawResult
					.map(zip.loadSync)
					.map((zipFile: JSZip)=> zipFile.file("index.xml").async("string"))
			}))
			.pipe(map((xmlText: Either<Error,string>)=>{
				return xmlText
					.map(BattleScribeIndex.fromString).join()
					.map(CatalogueIndex.fromBSIndex)
			}))
	}
	
	getCatalogue(): EitherAsync<Error,CatalogueIndex> {
		return 'Hi there!'
	}
}
