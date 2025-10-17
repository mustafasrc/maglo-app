import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <div>
          <div className="mb-5">
            <Header />
          </div>
          <div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
