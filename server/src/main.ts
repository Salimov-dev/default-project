import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { corsOptions } from "@common/options/cors.options";

const PORT = process.env.PORT || 5000;

async function start() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api");

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
