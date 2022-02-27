import { Injectable } from "@angular/core";
import { Either } from "purify-ts";
import { UnitCatalogue } from "../../model/UnitCatalogue";
import { BattlescribeDatasetCodec } from "./battlescribe-codec";

@Injectable({
    providedIn: 'root'
})
export class DatasetReaderService {

    constructor(private codec: BattlescribeDatasetCodec){}
    
    getCatalogueFromDataset(dataset: string): Either<Error,UnitCatalogue> {
        return this.codec.deserializeDataset(dataset)
    }
}

export interface DatasetCodec {
    deserializeDataset(dataset: string): Either<Error,UnitCatalogue>
    serializeDataset(catalogue: UnitCatalogue): Either<Error,string>
}