import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {CatalogueController} from "./controllers/catalogue.controller";
import {AppService} from "./services/app.service";

@Module({
  imports: [HttpModule],
  controllers: [CatalogueController],
  providers: [AppService],
})
export class AppModule {}
