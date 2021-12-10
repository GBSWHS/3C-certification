import { getConnection } from '../../../utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from '../../../types'
import { verify } from 'jsonwebtoken'
import { makeNumber } from '../../../utils/randomStr'

export default async function MeApi (req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' })
  const { name, per, owner } = req.body
  const { id } = req.query

  try {
    const decoded = await verify(token, process.env.JWT_SECRET!) as Token
    const user = await getConnection().where({ 'users.user_id': decoded.id }).from('users')
      .leftJoin('group', 'users.group_id', 'group.group_id').first()
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' })
    if (user.group_per < 3) return res.status(403).json({ success: false, message: 'Forbidden' })

    if (req.method === 'POST') {
      let owner
      if (!name || !per) return res.status(400).json({ success: false, message: 'Bad Request' })
      if (!owner) owner = user.user_id
      const ranid = makeNumber(15)
      await getConnection().insert({ group_id: ranid, group_name: name, group_per: per, group_owner: owner }).into('group')

      const group = await getConnection().where({ 'group.group_id': ranid }).from('group').first()
      if (!group) return res.status(500).json({ success: false, message: 'Internal Server Error' })

      res.status(200).json({ success: true, group })
    } else if (req.method === 'GET') {
      const group = await getConnection().where(id ? { 'group.group_id': id } : {}).from('group')
      return res.status(200).json({ success: true, group })
    } else if (req.method === 'PUT') {
      await getConnection().update({ group_name: name, group_per: per, group_owner: owner }).where({ 'group.group_id': id }).into('group')
      const group = await getConnection().where({ 'group.group_id': id }).from('group').first()
      if (!group) return res.status(500).json({ success: false, message: 'Internal Server Error' })
      return res.status(200).json({ success: true, group })
    } else if (req.method === 'DELETE') {
      await getConnection().del().from('group').where({ 'group.group_id': id })
      return res.status(200).json({ success: true })
    }
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    console.log(error)
  }
}
