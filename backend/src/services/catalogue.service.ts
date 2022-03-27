import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogueService {
  getCatalogueList(): Promise<Either<Error,CatalogueIndex>> {
    return 'Hi there!'
  }
}
