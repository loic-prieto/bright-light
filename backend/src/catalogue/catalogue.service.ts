import { HttpStatus, Injectable } from "@nestjs/common";
import { Either, Left, Right } from "purify-ts/Either";
import { map } from "rxjs/operators";
import { HttpService } from "@nestjs/axios";
import { CatalogueIndex } from "../../../common/src/model/CatalogueIndex";
import { Observable } from "rxjs";
import { BattleScribeIndex } from "./model/battlescribe/index/BattleScribeIndex";

const zip = require("amd-zip");

@Injectable()
export class CatalogueService {
  static BS_DATA_INDEX =
    "https://battlescribedata.appspot.com/repos/wh40k/index.bsi";

  constructor(private readonly httpClient: HttpService) {}

  getCatalogueList(): Observable<Either<Error, CatalogueIndex>> {
    return this.httpClient
      .get(CatalogueService.BS_DATA_INDEX, {
        responseType: "arraybuffer",
        responseEncoding: "binary",
      })
      .pipe(
        // Convert http response into an Either of raw bytes
        map((response) => {
          let result: Either<Error, ArrayBuffer>;
          if (response.status == HttpStatus.OK) {
            result = Right(response.data);
          } else {
            result = Left(
              new Error(
                `There was an error while retrieving the catalogue index (${CatalogueService.BS_DATA_INDEX}): ${response.status}-${response.data}`
              )
            );
          }
          return result;
        }),
        // Convert Either of raw bytes into Either of the content of the BS index file inside the zip archive that the
        // raw bytes represent
        map((zipfileBytes) =>
          zipfileBytes.map((bytes) => {
            const zipFile = zip(bytes);
            const indexFile = zipFile.getEntry("index.xml");
            if (indexFile) {
              return indexFile.getData().toString("utf8") as string;
            } else {
              throw new Error(
                `The downloaded battlescribe index archive (${CatalogueService.BS_DATA_INDEX}) did not have an index.xml file inside`
              );
            }
          })
        ),
        // Convert the index xml text representation to a catalogue index
        map((indexText) =>
          indexText
            .map((indexContent) =>
              BattleScribeIndex.fromString(indexContent)
                .map((bsIndex) => bsIndex.toCatalogueIndex())
                .join()
            )
            .join()
        )
      );
  }
}
