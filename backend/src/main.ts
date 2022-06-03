import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
const compression = require("compression");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  await app.listen(3000);
}

bootstrap();
