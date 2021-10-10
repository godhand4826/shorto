import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksModule } from './links/links.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
