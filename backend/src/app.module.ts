import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PropertieModule } from './propertie/propertie.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { OptionModule } from './option/option.module';

@Module({
  imports: [UserModule, PropertieModule, ReservationModule, AuthModule, OptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
