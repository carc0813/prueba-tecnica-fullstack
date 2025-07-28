// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch('/api/session');
        if (!res.ok) {
          router.push('/login');
          return;
        }

        const session = await res.json();
        setRole(session.user.role);
      } catch (error) {
        console.error('Error fetching session:', error);
        router.push('/login');
      }
    }

    fetchSession();
  }, [router]);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl font-bold mb-6'>Sistema de Gestión Financiera</h1>
      <div className='grid gap-4 w-full max-w-md'>
        <Link
          href='/movements'
          className='bg-blue-600 text-white py-3 px-4 rounded-xl text-center hover:bg-blue-700'
        >
          Gestión de Ingresos y Gastos
        </Link>

        {role === 'ADMIN' && (
          <>
            <Link
              href='/users'
              className='bg-green-600 text-white py-3 px-4 rounded-xl text-center hover:bg-green-700'
            >
              Gestión de Usuarios
            </Link>
            <Link
              href='/reports'
              className='bg-purple-600 text-white py-3 px-4 rounded-xl text-center hover:bg-purple-700'
            >
              Reportes
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
