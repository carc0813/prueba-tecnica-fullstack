
import { signIn } from 'better-auth/react';

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
     
      <button onClick={() => signIn('github')}>
  Iniciar sesión con GitHub
</button>
    </div>
  );
}
