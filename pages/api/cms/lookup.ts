import { getConnection } from '../../../utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from '../../../types'
import { verify } from 'jsonwebtoken'

export default async function MeApi (req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' })

  const { id } = req.query

  try {
    const decoded = await verify(token, process.env.JWT_SECRET!) as Token
    const user = await getConnection().where({ 'users.user_id': decoded.id }).from('users')
      .leftJoin('group', 'users.group_id', 'group.group_id').first()
    if (!user) return res.status(401).json({ success: false, error: 'Unauthorized' })
    if (user.group_per < 3) return res.status(403).json({ success: false, error: 'Forbidden' })

    if (req.method === 'GET') {
      const data = !id
        ? await getConnection().from('users')
          .leftOuterJoin('verify', 'users.user_id', 'verify.user_id')
          .leftOuterJoin('item', 'verify.item_id', 'item.item_id')
          .sum('item.item_point as points')
          .select('users.user_id', 'users.user_name') 
          .orderBy('points', 'desc')
        : await getConnection().from('verify')
          .join('item', 'verify.item_id', 'item.item_id')
          .join('users', 'verify.user_id', 'users.user_id')
          .where({ 'users.user_id': id })
          .orderBy('item.item_gn', 'desc')

      return res.status(200).json({ success: true, data })
    } else return res.status(400).json({ success: false, error: 'Bad Request' })
  } catch (error: any) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    console.log(error)
  }
}
