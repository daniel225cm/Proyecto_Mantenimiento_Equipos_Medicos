import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import databaseConfig from './config/database.config';

import { Role } from './roles/role.entity';
import { User } from './users/user.entity';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { EquiposModule } from './equipos/equipos.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';

@Module({
  imports: [
    // 🔐 CONFIG GLOBAL (OBLIGATORIO PRIMERO)
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),

    // 🗄️ DATABASE
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        autoLoadEntities: true,

        // entidades base
        entities: [Role, User],

        synchronize: false,
        logging: true,
      }),
    }),

    // 📦 MÓDULOS
    AuthModule,
    RolesModule,
    UsersModule,
    EquiposModule,
    MantenimientosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}