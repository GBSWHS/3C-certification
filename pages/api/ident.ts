import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../utils/database'

interface IdentData {
  name?: string
  type?: boolean
  id?: number
}

interface IdentBody extends IdentData {
  success: boolean
  posts?: any
}

const db = getConnection()

export default async function IdentApi (req: NextApiRequest, res: NextApiResponse<IdentBody>) {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ success: false })

  try {
    const ident = jwt.verify(token, process.env.TOKEN_SECRET!) as IdentData
    const posts = await db.where({ author_id: ident.id }).select('*').from('posts')
    res.json({ success: true, ...ident, posts })
  } catch (err) {
    res.status(401).json({ success: false })
  }
}
