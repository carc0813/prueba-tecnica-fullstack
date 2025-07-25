import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // ✅ CORRECTO
import { getSession } from '@/lib/auth-session';
import { requireRole } from '@/lib/rbac';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const movements = await prisma.movement.findMany({
      include: { user: true },
      orderBy: { date: 'desc' },
    });
    return res.status(200).json(movements);
  }

  if (req.method === 'POST') {
    try {
      requireRole(session, 'ADMIN');
      const { concept, amount, date } = req.body;

      const newMovement = await prisma.movement.create({
        data: {
          concept,
          amount: parseFloat(amount),
          date: new Date(date),
          userId: session.user.id,
        },
      });

      return res.status(201).json(newMovement);
    } catch (error: any) {
      return res.status(403).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

