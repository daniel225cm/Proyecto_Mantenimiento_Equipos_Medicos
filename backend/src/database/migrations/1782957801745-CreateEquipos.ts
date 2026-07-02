import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEquipos1782957801745 implements MigrationInterface {
    name = 'CreateEquipos1782957801745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "equipos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "marca" character varying NOT NULL, "modelo" character varying NOT NULL, "serial" character varying, "estado" character varying NOT NULL DEFAULT 'ACTIVO', "ubicacion" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_451fffd8d175b5b7aadbf5ba760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "equipos"`);
    }

}
