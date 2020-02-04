import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { NODE_ENV, PORT } from '@/environments';
import { setupSwagger } from '@/swagger';
import { Transport } from '@nestjs/common/enums/transport.enum';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    // const httpsOptions = {
    // 	key: fs.readFileSync('ssl/private.key'),
    // 	cert: fs.readFileSync('ssl/certificate.crt'),
    // 	ca: fs.readFileSync('ssl/ca_bundle.crt'),
    // }
    const logger = new Logger('bootstrap');

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      // httpsOptions,
      cors: true,
    });

    // body parser
    app.use(bodyParser.json({ limit: '2mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '2mb',
        extended: true,
        parameterLimit: 2000,
      }),
    );

    // Compression
    app.use(compression());

    // Security
    app.use(helmet());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );

    if (NODE_ENV === 'development') {
      app.enableCors();
    } else {
      app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus: 200,
        credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
      });
      logger.log(`Accepting request from origin http`);
    }

    setupSwagger(app);

    await app.listen(PORT);
    logger.log(`Application listening on port ${PORT}`);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch(e => {
  throw e;
});
