import { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../utils/database'
import hashString from '../../utils/hash'
import { sign } from 'jsonwebtoken'

export default async function MeApi (req: NextApiRequest, res: NextApiResponse) {
  const { id, passwd } = req.body
  if (!id || !passwd) return res.status(400).json({ success: false, error: 'id or passwd is missing' })

  console.log(hashString(passwd + '1234'))
  const user = await getConnection().where({ user_id: id }).from('users').first()
  if (!user) return res.status(400).json({ success: false, error: 'id or passwd is wrong' })
  if (user.user_passwd !== hashString(passwd + user.user_salt)) return res.status(400).json({ success: false, error: 'id or passwd is wrong' })

  const token = sign({ id: user.user_id }, process.env.JWT_SECRET || '', { expiresIn: '1h' })
  res.setHeader('Set-Cookie', [`token=${token}; Path=/; HttpOnly`])
  res.json({ success: true, token })
}
