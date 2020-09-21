import { Auth } from './auth/auth.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/employeer',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Auth],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
