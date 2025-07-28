import { Session } from 'better-auth';

export function requireRole(session: Session | null, role: 'ADMIN' | 'USER') {
  if (!session) {
    throw new Error('Unauthorized');
  }

  if (session.user.role !== role) {
    throw new Error('Forbidden');
  }

  return session;
}
