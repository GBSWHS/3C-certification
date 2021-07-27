import knex from 'knex'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

interface NoticeData {
  id: number
  title: string
  content: string
  createdAt: string
  author: string
  memberOnly: boolean
}

interface NoticesBody {
  success: boolean,
  notices?: NoticeData[]
}

const db = knex({
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

export default async function ListNoticesApi (req: NextApiRequest, res: NextApiResponse<NoticesBody>) {
  let isMember = false
  const { token } = req.cookies
  try {
    if ((jwt.verify(token!, process.env.TOKEN_SECRET!) as any).user) isMember = true
  } catch (_) { }

  const notices = await db.select('*').from('notices').orderBy('createdAt', 'desc').where({ ...(isMember ? {} : { memberOnly: false }) })

  res.send({ success: true, notices })
}
