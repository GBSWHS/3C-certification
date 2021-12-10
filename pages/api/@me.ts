import { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../utils/database'
import { verify } from 'jsonwebtoken'
import { Token } from '../../types'

export default async function MeApi (req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' })

  try {
    const decoded = await verify(token, process.env.JWT_SECRET!) as Token
    const user = await getConnection().where({ 'users.user_id': decoded.id }).from('users')
      .leftJoin('group', 'users.group_id', 'group.group_id').first()
      .select('users.user_name', 'users.user_type', 'group.group_name')
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' })

    res.status(200).json({ success: true, user })
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    console.log(error)
  }
}
