import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter, TransformInterceptor } from './middleware';
import { setupSwagger } from './configs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { TrimPipe } from './common/pipe/TrimPipe';
import { AuthenticatedSocketIoAdapter } from './gatewaies/authenticated-socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const logger = app.get(Logger);
  const version = config.get<string>('server.version');

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.setGlobalPrefix(`/${version}`);
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }), new TrimPipe());
  app.useGlobalFilters(new AppExceptionFilter(logger, httpAdapter));
  app.useGlobalInterceptors(new LoggerErrorInterceptor(), new TransformInterceptor());
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));

  logger.log(`Application running at ${process.env.NODE_ENV} mode`);

  const port = config.get<number>('server.port');
  app.enableCors({
    origin: '*',
    methods: '*',
    // credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    // preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app, version);
  }

  await app.listen(port);
  logger.log(`Application listen on port ${port}`);
}
bootstrap();
