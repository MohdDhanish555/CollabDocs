import { NestFactory, Reflector } from "@nestjs/core";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("CollabDocs Api")
    .setDescription("Collaborative Document Management System")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(4000);
}
bootstrap();
