// pages/api/session.ts
import { getSession } from '@/lib/auth-session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json(session);
}
