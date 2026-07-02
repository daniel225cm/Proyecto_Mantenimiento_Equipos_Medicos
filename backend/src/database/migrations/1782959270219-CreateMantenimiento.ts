import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMantenimiento1782959270219 implements MigrationInterface {
    name = 'CreateMantenimiento1782959270219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mantenimientos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descripcion" character varying NOT NULL, "estado" character varying NOT NULL DEFAULT 'PENDIENTE', "tipo" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "equipoId" uuid, "tecnicoId" uuid, CONSTRAINT "PK_610cd7f1e420b18c3d090ade2b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mantenimientos" ADD CONSTRAINT "FK_0ef95602a8ecde65711e29da987" FOREIGN KEY ("equipoId") REFERENCES "equipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimientos" ADD CONSTRAINT "FK_ddf7203bfa1192610723dd91223" FOREIGN KEY ("tecnicoId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mantenimientos" DROP CONSTRAINT "FK_ddf7203bfa1192610723dd91223"`);
        await queryRunner.query(`ALTER TABLE "mantenimientos" DROP CONSTRAINT "FK_0ef95602a8ecde65711e29da987"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"`);
    }

}
