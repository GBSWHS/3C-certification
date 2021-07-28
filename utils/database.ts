import knex, { Knex } from 'knex'

let db: Knex
export function getConnection () {
  if (!db) {
    db = knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || '3ccert',
        port: Number(process.env.DB_PORT) || 3306,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || '3ccert',
        charset: 'utf8mb4'
      }
    })
  }

  return db
}
