import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from 'purify-ts/Either';
import { map, catchError, concatMap } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import JSZip from 'jszip';
import { loadAsync } from 'jszip';
import { BattleScribeIndex } from './model/battlescribe/index/BattleScribeIndex';
import { CatalogueIndex } from '../../../common/src/model/CatalogueIndex';
import { Observable, pipe } from 'rxjs';
import { EitherAsync } from 'purify-ts';

@Injectable()
export class CatalogueService {
  static BS_DATA_INDEX =
    'https://battlescribedata.appspot.com/repos/wh40k/index.bsi';

  constructor(private readonly httpClient: HttpService) {}

  getCatalogueList(): Observable<Either<Error, CatalogueIndex>> {
    return this.httpClient
      .get(CatalogueService.BS_DATA_INDEX, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
      })
      .pipe(
        map((response) => {
          let result: Either<Error, ArrayBuffer>;
          if (response.status == HttpStatus.OK) {
            result = Right(response.data);
          } else {
            result = Left(
              new Error(
                `There was an error while retrieving the catalogue index: ${response.status}-${response.data}`,
              ),
            );
          }
          return result;
        }),
      )
      .pipe(
        map(rawResult=>Right("")}
        //concatMap((rawResult: Either<Error, ArrayBuffer>) => {
        //  return rawResult
        //    .map(loadAsync)
        //    .map((zipFile: JSZip) => zipFile.file('index.xml').async('string'));
        //}),
      )
      .pipe(
        map((xmlText: Either<Error, string>) => {
          return xmlText
            .map(BattleScribeIndex.fromString)
            .join()
            .map((catalogue) => catalogue.toCatalogueIndex())
            .join();
        }),
      );
  }
}
