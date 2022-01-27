import { Module } from '@nestjs/common';
import { PropertieService } from './propertie.service';
import { PropertieController } from './propertie.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PropertieController],
  providers: [PropertieService, PrismaService],
})
export class PropertieModule {}
