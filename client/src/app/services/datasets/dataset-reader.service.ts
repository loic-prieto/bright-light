import { Inject, Injectable } from "@angular/core";
import { Either } from "purify-ts";
import { DATASET_CODEC_DI_TOKEN } from "src/app/app.module";
import { UnitCatalogue } from "../../model/UnitCatalogue";

@Injectable()
export class DatasetReaderService {

    constructor(@Inject(DATASET_CODEC_DI_TOKEN) private codec: DatasetCodec){}
    
    getCatalogueFromDataset(dataset: string): Either<Error,UnitCatalogue> {
        return this.codec.deserializeDataset(dataset)
    }
}

export interface DatasetCodec {
    deserializeDataset(dataset: string): Either<Error,UnitCatalogue>
    serializeDataset(catalogue: UnitCatalogue): Either<Error,string>
}