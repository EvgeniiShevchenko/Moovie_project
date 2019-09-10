import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const bodyParser =  require("body-parser");
import morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // if(process.env.NODE_ENV === 'development'){
  //   app.enableCors();
  // }
  // app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    // next();
  // });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  await app.listen(5000);
}
bootstrap();
