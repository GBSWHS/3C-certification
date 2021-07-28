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
  message?: string,
  id?: number,
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

export default async function NoticesApi (req: NextApiRequest, res: NextApiResponse<NoticesBody>) {
  const { token } = req.cookies
  if (req.method === 'GET') { // Get Notices List
    const { id } = req.query
    let isMember = false
    try {
      if ((jwt.verify(token!, process.env.TOKEN_SECRET!) as any).id) isMember = true
    } catch (_) { }
    const notices = !id
      ? await db.select('*').from('notices').orderBy('createdAt', 'desc').where(isMember ? {} : { memberOnly: false })
      : (await db.select('*').from('notices').where({ id }).orderBy('createdAt', 'desc'))[0]
    res.send({ success: true, notices })
  } else if (req.method === 'POST') { // Post New Notice
    try {
      const { type, name: author } = (jwt.verify(token!, process.env.TOKEN_SECRET!) as any)
      if (!type) return res.status(403).send({ success: false, message: '공지사항 작성 권한이 없습니다 (요구권한: 선생님)' })
      const { title, content, memberOnly } = req.body
      await db.insert({ title, content, author, memberOnly }).into('notices')

      const [data] = await db.select('*').where({ title, content, memberOnly }).limit(1).from('notices')
      if (!data) return

      res.send({ success: true, id: data.id })
    } catch (err) {
      console.log(err)
      return res.status(403).send({ success: false, message: '공지사항을 작성하려면 로그인하여야 합니다' })
    }
  }
}
