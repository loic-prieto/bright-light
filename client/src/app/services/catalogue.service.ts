import { Injectable, OnInit } from '@angular/core';
import { UnitCatalogue } from '../model/UnitCatalogue';
import { Either, Maybe, Right } from 'purify-ts'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DatasetReaderService } from './datasets/dataset-reader.service';
import { Observable } from 'rxjs';

/**
 * Provides functions related to managing catalogues
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  // For now this will serve to control whether the service is able to fetch the catalogues,
  // which will happen as the application loads asynchronously, and provide meaningful error
  // messages
  private couldFetchCatalogues = false

  // Forget the power of using objects as keys in maps, for so much has been forgotten never to 
  // be relearned...
  private inMemoryCatalogueDatabase = new Map<string,UnitCatalogue>()

  constructor(
    private httpClient: HttpClient, 
    private datasetReaderService: DatasetReaderService) {
      this.httpClient.get('./assets/test_bs_catalogue.cat',{ 
        headers: new HttpHeaders({ 'Content-Type': 'application/xml' }),
        observe: 'response',
        responseType: 'arraybuffer'
      }).subscribe(this.receiveCatalogues)
    }

  public getCatalogue(name: string, version: string): Either<Error, Maybe<UnitCatalogue>> {
    return Either.encase(() => {
      if (this.couldFetchCatalogues) {
        throw new Error("Could not load catalogues, check error messages in the console")
      } else {
        return Maybe.fromNullable(this.inMemoryCatalogueDatabase.get(catalogueKey(name, version)))
      }
    })
  }

  public getAvailableCatalogues(): Observable<Either<Error,Array<CatalogueListItem>>> {
    // This way of retrieving the catalogue list will have to be changed when we have several of them
    // since it is based on first loading all of them fully
    this.httpClient.get('./assets/test_bs_catalogue.cat',{ 
      headers: new HttpHeaders({ 'Content-Type': 'application/xml' }),
      observe: 'response',
      responseType: 'arraybuffer'
    })
      .pipe(this.receiveCatalogues)
      .subscribe(this.receiveCatalogues)
    
    
  }

  private receiveCatalogues(httpEvent: HttpResponse<ArrayBuffer>): void {
    if(httpEvent.ok) {
      if(httpEvent.body) {
        const datasetContent = new Uint8Array(httpEvent.body).toString()
        const datasetParsingResult = this.datasetReaderService.getCatalogueFromDataset(datasetContent)
        if(datasetParsingResult.isRight()) {
          const catalogue = datasetParsingResult.extract()
          this.inMemoryCatalogueDatabase.set(catalogueKey(catalogue.name,catalogue.version),catalogue)
          this.couldFetchCatalogues = true
        } else {
          this.couldFetchCatalogues = false
          const errorMessage = datasetParsingResult.mapLeft((error)=>error.message).extract()
          console.error(`Could not load the dataset for url ${httpEvent.url}: ${errorMessage}`)
        }
      }
    } else {
      this.couldFetchCatalogues = false
      const bodyText = httpEvent.body ? new Uint8Array(httpEvent.body).toString() : ""
      console.error(`Could not load the sample catalogue: for URL ${httpEvent.url} Status: ${httpEvent.status} ${httpEvent.statusText}, Message: ${bodyText}`)
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