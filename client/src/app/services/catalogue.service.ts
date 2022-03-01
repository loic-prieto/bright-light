import {Injectable} from '@angular/core';
import {UnitCatalogue} from '../model/UnitCatalogue';
import {Observable, of} from 'rxjs'
import {map, tap} from 'rxjs/operators'
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {DatasetReaderService} from './datasets/dataset-reader.service';

/**
 * Provides functions related to managing catalogues
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  // Forget the power of using objects as keys in maps, for so much has been forgotten never to 
  // be relearned...
  private inMemoryCatalogueDatabase = new Map<string, UnitCatalogue>()

  constructor(
      private httpClient: HttpClient,
      private datasetReaderService: DatasetReaderService) {
  }

  public getCatalogue(name: string, version: string): Observable<UnitCatalogue> {
    if (this.inMemoryCatalogueDatabase.has(catalogueKey(name, version))) {
      return of(this.inMemoryCatalogueDatabase.get(catalogueKey(name, version)) as UnitCatalogue)
    } else {
      return this.httpClient.get('./assets/test_bs_catalogue.cat', {
        headers: new HttpHeaders({'Content-Type': 'application/xml'}),
        observe: 'response',
        responseType: 'arraybuffer'
      }).pipe(
          map(this.parseCatalogue),
          // Cache the result
          tap((catalogue) => {
            this.inMemoryCatalogueDatabase.set(catalogueKey(name, version), catalogue)
          })
      )
    }
  }

  public getAvailableCatalogues(): Observable<Array<CatalogueListItem>> {
    // While keeping an async API, for now we just retrieve a very static list
    // of catalogues, that in the future will be queried in the backend
    return of([{name: 'Test Catalogue', version: '184'}])
  }

  private parseCatalogue(httpEvent: HttpResponse<ArrayBuffer>): UnitCatalogue {
    if (httpEvent.ok) {
      if (httpEvent.body) {
        const datasetContent = new Uint8Array(httpEvent.body).toString()
        const datasetParsingResult = this.datasetReaderService.getCatalogueFromDataset(datasetContent)
        if (datasetParsingResult.isRight()) {
          return datasetParsingResult.extract()
        } else {
          const errorMessage = datasetParsingResult.mapLeft((error) => error.message).extract()
          throw new Error(`Could not load the dataset for url ${httpEvent.url}: ${errorMessage}`)
        }
      } else {
        throw new Error(`The call to ${httpEvent.url} was successful but there's no catalogue body, this is an error in the code`)
      }
    } else {
      const bodyText = httpEvent.body ? new Uint8Array(httpEvent.body).toString() : ""
      throw new Error(`Error while calling the catalogue at ${httpEvent.url}: status ${httpEvent.status} ${httpEvent.statusText}\n${bodyText}`)
    }
  }
}

/**
 * A simplified projection of a Catalogue to be used in lists
 */
export interface CatalogueListItem {
  name: string,
  version: string
}

function catalogueKey(catalogueName: string, catalogueVersion: string): string {
  return `${catalogueName}-${catalogueVersion}`
}