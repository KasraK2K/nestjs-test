import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as config from 'config';
import * as compression from 'compression';
import { ratelimitConfig } from './config/ratelimit.config';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as express from 'express';
dotenv.config();

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: serverConfig.logger,
  });
  app.disable('x-powered-by');
  app.use(
    '/documentation',
    express.static(process.cwd() + serverConfig.documentation),
  );
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    // setup swagger
    const document = SwaggerModule.createDocument(app, swaggerConfig.options);
    SwaggerModule.setup('swagger', app, document);
  } else {
    app.set('trust proxy', 1);
    app.enableCors({ origin: serverConfig.origin });
    app.use(ratelimitConfig);
    logger.warn(`Accepting requests from origin "${serverConfig.origin}"`);
  }
  app.use(helmet());
  app.use(compression());
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.debug(`DB_HOSTNAME: ${process.env.DB_HOSTNAME}`);
  logger.debug(`DB_PORT: ${process.env.DB_PORT}`);
  logger.debug(`DB_USERNAME: ${process.env.DB_USERNAME}`);
  logger.debug(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
  logger.debug(`DB_DB_NAME: ${process.env.DB_DB_NAME}`);

  logger.log(`Application listening on port ${port} 🚀`);
}
bootstrap();
