import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['./env/.env.production','./env/.production.env' ]
      envFilePath: `./env/.env.${process.env.NODE_ENV}`
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: "10m"}
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
