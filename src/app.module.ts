import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [CatsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "api-rest-nestjs-bluuweb",
      autoLoadEntities: true,
      synchronize: true,
    }),
    BreedsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
