// lib/auth.ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  events: {
    // ✅ Asignar rol ADMIN automáticamente a nuevos usuarios
    async onCreateUser({ id }: { id: string }) {
      await prisma.user.update({
        where: { id },
        data: { role: Role.ADMIN },
      });
    },
  },
});

export type Session = typeof auth.$Infer.Session;
