module.exports = class Init1660673885836 {
  name = 'Init1660673885836'

  async up(db) {
    await db.query(`CREATE TABLE "balance_deposit" ("id" character varying NOT NULL, "to" text NOT NULL, "balance" numeric NOT NULL, "timestamp" text NOT NULL, CONSTRAINT "PK_7e627a00c0abb72c2b8b3d8c905" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "treasury_deposit" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "timestamp" text NOT NULL, CONSTRAINT "PK_bb0b858d6d7f00be291469da01e" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "balance_deposit"`)
    await db.query(`DROP TABLE "treasury_deposit"`)
  }
}
