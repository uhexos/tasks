import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteDriver } from '@mikro-orm/sqlite';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MikroOrmModule.forRoot({
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      dbName: 'my-db-name.sqlite3',
      driver: SqliteDriver,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
