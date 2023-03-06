import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication, version: string): void => {
  const configDocument = new DocumentBuilder()
    .setTitle(`Dutalk Restful APIs document`)
    .setDescription(`Swagger Representation APIs using in Dutalk`)
    .setVersion(version)
    .addBearerAuth({
      type: `http`,
      scheme: `Bearer`,
      bearerFormat: `JWT`,
      name: `Authorization`,
      description: `Please enter {token} in following format: Bearer <JWT>`,
      in: `header`,
    })
    .addCookieAuth(`Authentication`, {
      type: `http`,
      description: `Please enter accessToken`,
    })
    .addOAuth2()
    .build();
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      displayOperationId: true,
      displayRequestDuration: true,
    },
  };
  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup(`api-docs`, app, document, options);
};
