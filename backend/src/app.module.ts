import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {CatalogueModule} from "./catalogue/catalogue.module"

@Module({
  imports: [HttpModule,CatalogueModule]
})
export class AppModule {}
