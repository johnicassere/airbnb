import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PropertieModule } from './propertie/propertie.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PropertieModule, ReservationModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
