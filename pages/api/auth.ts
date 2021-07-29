import jwt from 'jsonwebtoken'
import fetcher from 'node-fetch'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function AuthApi (req: NextApiRequest, res: NextApiResponse) {
  const resp = await fetcher(process.env.OAUTH_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: req.query.code,
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.OAUTH_REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  }).then((res) => res.json())
  if (!resp.success) return res.redirect(process.env.NEXT_PUBLIC_OAUTH_URI!)
  const token = jwt.sign({ ...resp.user, type: resp.user.class_number === 0 }, process.env.TOKEN_SECRET!, { expiresIn: '1h' })
  res.setHeader('Set-Cookie', `token=${token}; path=/; expires=${new Date(Date.now() + 3600000).toUTCString()}`)
  res.redirect('/')
}
