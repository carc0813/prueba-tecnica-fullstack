// pages/login.tsx
export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => {
          window.location.href = '/api/auth/github'; // ✅ Redirección manual
        }}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Iniciar sesión con GitHub
      </button>
    </div>
  );
}

