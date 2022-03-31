import {Controller, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {CatalogueIndex} from "./model/bright-light/CatalogueIndex"
import {CatalogueService} from "./catalogue.service"

@Controller('catalogues')
export class CatalogueController {
    static BS_DATA_INDEX = "https://battlescribedata.appspot.com/repos/wh40k/index.bsi"

    constructor(private readonly catalogueService: CatalogueService) {}

    @Get()
    async getCatalogueList(@Res() response: Response) {
        return this.catalogueService.getCatalogues()
			.ifLeft(error=>{
				response.status(HttpStatus.SERVER_ERROR)
					.body(error)
					.send()
			})
			.ifRight(catalogues=>{
				response.status(HttpStatus.OK)
					.body(catalogues)
					.send()
			})
	}
}
