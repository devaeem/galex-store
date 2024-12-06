import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExampleModule } from './example/example.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { AuthenticationModule } from './authentication/authentication.module';
@Module({
  imports: [
    ExampleModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    CategoryModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
