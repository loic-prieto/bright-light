import { CatalogueIndexEntry } from './CatalogueIndexEntry';

export class CatalogueIndex {
  constructor(
    public name: string,
    public entries: Array<CatalogueIndexEntry>,
  ) {}
}
