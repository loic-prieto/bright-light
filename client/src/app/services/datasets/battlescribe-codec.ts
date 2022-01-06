import { Injectable } from "@angular/core";
import { Either } from "purify-ts";
import { UnitCatalogue } from "src/app/model/UnitCatalogue";
import { XML } from "sxml";
import { DatasetCodec } from "./dataset-reader.service";

@Injectable()
export class BattlescribeDatasetCodec implements DatasetCodec {

    serializeDataset(catalogue: UnitCatalogue): Either<Error,string> {
        return Either.encase(()=>{
            console.log(catalogue)
            throw new Error("Not implemented yet")
        })
    }

    deserializeDataset(dataset: string): Either<Error, UnitCatalogue> {
        return Either.encase(()=>{
            const xmlParser = new XML(dataset)
            console.log(xmlParser)

            throw new Error("Not implemented yet")
        })
    }
}