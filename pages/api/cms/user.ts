import { getConnection } from '../../../utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from '../../../types'
import { verify } from 'jsonwebtoken'
import { makeNumber, makeString } from '../../../utils/randomStr'
import hashString from '../../../utils/hash'

export default async function MeApi (req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' })

  const { group, name, type, passwd, id } = req.body
  const { id: searchId } = req.query

  try {
    const decoded = await verify(token, process.env.JWT_SECRET!) as Token
    const user = await getConnection().where({ 'users.user_id': decoded.id }).from('users')
      .leftJoin('group', 'users.group_id', 'group.group_id').first()
    if (!user) return res.status(401).json({ success: false, error: 'Unauthorized' })
    if (user.group_per < 3) return res.status(403).json({ success: false, error: 'Forbidden' })

    if (req.method === 'POST') {
      console.log(group, name, type, passwd, id)
      if (!String(group) || !name || !String(type) || !passwd) return res.status(400).json({ success: false, error: 'Bad Request' })
      const ranid = makeNumber(15)
      const salt = makeString(10)

      const getGroup = await getConnection().where({ group_id: group }).from('group').first()
      if (!getGroup) return res.status(400).json({ success: false, error: 'Bad Request' })

      const getUser = await getConnection().where({ user_id: ranid }).from('users').first()
      if (getUser) return res.status(400).json({ success: false, error: 'Bad Request' })

      await getConnection().insert({
        user_id: ranid,
        group_id: getGroup.group_id,
        user_name: name,
        user_type: type,
        user_passwd: hashString(passwd + salt),
        user_salt: salt
      }).into('users')
      const getResult = await getConnection().where({ user_id: ranid }).from('users')
        .select('user_id', 'user_name', 'user_type', 'group_id').first()

      return res.status(200).json({ success: true, data: getResult })
    } else if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ success: false, error: 'Bad Request' })
      await getConnection().where({ user_id: id }).delete().from('users')
      return res.status(200).json({ success: true })
    } else if (req.method === 'PUT') {
      if (!id) return res.status(400).json({ success: false, error: 'Bad Request' })
      const getUser = await getConnection().where({ user_id: id }).from('users').first()
      if (!getUser) return res.status(400).json({ success: false, error: 'Bad Request' })
      if (getUser.user_type > 2) return res.status(403).json({ success: false, error: 'Forbidden' })

      const getGroup = await getConnection().where({ group_id: group }).from('group').first()
      if (!getGroup) return res.status(400).json({ success: false, error: 'Bad Request' })

      await getConnection().where({ user_id: id }).update({
        group_id: group.group_id,
        user_name: name,
        user_type: type
      }).into('users')
      const getResult = await getConnection().where({ user_id: id }).from('users')
        .select('user_id', 'user_name', 'user_type', 'group_id').first()

      return res.status(200).json({ success: true, data: getResult })
    } else if (req.method === 'GET') {
      const getResult = await getConnection().where(searchId ? { user_id: searchId } : {}).from('users')
        .join('group', 'users.group_id', 'group.group_id')
        .select('user_id', 'user_name', 'user_type', 'group.group_id', 'group.group_name', 'group.group_per')
      return res.status(200).json({ success: true, user: getResult })
    }
  } catch (error: any) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    console.log(error)
  }
}
