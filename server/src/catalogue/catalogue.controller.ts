import { Controller, Get, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { CatalogueService } from "./catalogue.service";
import { CatalogueIndex } from "bright-light-common";

@Controller("catalogues")
export class CatalogueController {
  static BS_DATA_INDEX =
    "https://battlescribedata.appspot.com/repos/wh40k/index.bsi";

  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  async getCatalogueList(@Res() response: Response<CatalogueIndex | Error>) {
    return this.catalogueService.getCatalogueList().subscribe({
      next: (catalogueIndex) =>
        catalogueIndex
          .ifLeft((error: Error) => {
            response
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json(error)
              .send();
          })
          .ifRight((catalogues: CatalogueIndex) => {
            response.status(HttpStatus.OK).json(catalogues).send();
          }),
      error: (e) =>
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e).send(),
    });
  }
}
