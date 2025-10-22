
import Sidebar from '@/components/Sidebar';
import AuthGuard from '@/components/AuthGuard'; // Importamos el guardián

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
