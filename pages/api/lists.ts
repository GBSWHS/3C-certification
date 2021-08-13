import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../utils/database'

interface PostsData {
  id: number
  title: string
  content: string
  createdAt: string
  author: string
  reason: string
  status: number
  tag: string
}

interface PostsBody {
  success: boolean,
  message?: string,
  id?: number,
  posts?: PostsData[]
}

const db = getConnection()

export default async function NoticesApi (req: NextApiRequest, res: NextApiResponse<PostsBody>) {
  const { token } = req.cookies
  if (req.method === 'GET') { // Get posts List
    const { id } = req.query
    try {
      const { id: userid, type } = jwt.verify(token!, process.env.TOKEN_SECRET!) as any
      const posts = !id
        ? await db.select('*').from('posts').orderBy('createdAt', 'desc')
        : (await db.select('*').from('posts').where({ id }).orderBy('createdAt', 'desc'))[0]

      if (!posts) return res.send({ success: false, message: '해당 게시글을 찾을 수 없습니다' })
      if (id) return res.send({ success: true, posts })
      if (posts.author_id === userid || type || !id) return res.send({ success: true, posts })
      return res.send({ success: false, message: '게시글 열람 권한이 없습니다 (요구권한: 선생님 혹은 작성자)' })
    } catch (_) {
      return res.send({ success: false, message: '게시글을 열람하려면 로그인하여야 합니다' })
    }
  } else if (req.method === 'POST') { // Post New Notice
    try {
      const { type, name: author, id: authorid } = (jwt.verify(token!, process.env.TOKEN_SECRET!) as any)
      if (type) return res.status(403).send({ success: false, message: '게시글 작성 권한이 없습니다 (요구권한: 학생)' })
      const { title, content, tag } = req.body
      await db.insert({ title, content, author, author_id: authorid, tag }).into('posts')

      const [data] = await db.select('*').where({ title, content }).limit(1).from('posts')
      if (!data) return

      res.send({ success: true, id: data.id })
    } catch (err) {
      console.log(err)
      return res.status(403).send({ success: false, message: '게시글을 작성하려면 로그인하여야 합니다' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body
      if (!id) return res.status(403).send({ success: false, message: '게시글의 id가 필요합니다.' })
      const { type, id: authorid } = (jwt.verify(token!, process.env.TOKEN_SECRET!) as any)
      const post = await db.where({ id }).from('posts').first()
      if (!post) return res.status(403).send({ success: false, message: '해당 게시글을 찾을 수 없습니다' })
      if (type || authorid === post.author_id) {
        await db.del().where({ id }).from('posts')
        return res.send({ success: true })
      }
      return res.status(403).send({ success: false, message: '게시글 삭제 권한이 없습니다 (요구권한: 선생님 또는 작성자)' })
    } catch (err) {
      console.log(err)
      return res.status(403).send({ success: false, message: '게시글을 삭제하려면 로그인하여야 합니다' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, title, content, tag } = req.body
      if (!id) return res.status(403).send({ success: false, message: '게시글의 id가 필요합니다.' })
      const { id: authorid } = (jwt.verify(token!, process.env.TOKEN_SECRET!) as any)
      const post = await db.where({ id }).from('posts').first()
      if (!post) return res.status(403).send({ success: false, message: '해당 게시글을 찾을 수 없습니다' })
      if (parseInt(authorid) === post.author_id) {
        await db.update({ title, content, tag }).where({ id }).from('posts')
        return res.send({ success: true, id })
      }
      return res.status(403).send({ success: false, message: '게시글 수정 권한이 없습니다 (요구권한: 작성자)' })
    } catch (err) {
      console.log(err)
      return res.status(403).send({ success: false, message: '게시글을 수정하려면 로그인하여야 합니다' })
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id, reason, status } = req.body
      if (!id) return res.status(403).send({ success: false, message: '게시글의 id가 필요합니다.' })
      const { type, id: tcid } = (jwt.verify(token!, process.env.TOKEN_SECRET!) as any)
      if (!type) return res.status(403).send({ success: false, message: '게시글 상태 변경 권한이 없습니다 (요구권한: 선생님)' })
      await db.update({ reason, status, tc_id: tcid }).where({ id }).from('posts')

      res.send({ success: true, id })
    } catch (err) {
      console.log(err)
      return res.status(403).send({ success: false, message: '게시글의 상태를 변경하려면 로그인하여야 합니다' })
    }
  }
}
