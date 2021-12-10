import { NextApiRequest, NextApiResponse } from 'next'

export default function Logout (req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'token=; Path=/')
  res.status(200).redirect('/login')
}
