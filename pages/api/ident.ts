import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

interface IdentData {
  name?: string
  type?: boolean
}

interface IdentBody extends IdentData {
  success: boolean
}

export default function IdentApi (req: NextApiRequest, res: NextApiResponse<IdentBody>) {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ success: false })

  try {
    res.json({ success: true, ...jwt.verify(token, process.env.TOKEN_SECRET!) as IdentData })
  } catch (_) {
    res.status(401).json({ success: false })
  }
}
