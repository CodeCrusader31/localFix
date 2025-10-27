// app/serviceProvider/[id]/layout.js
import Sidebar from "../../../components/sidebar";

export default async function ProviderLayout({ children, params }) {
  const { id } = await params;  // await params
  const base = `/serviceProvider/${id}`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar base={base} />

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
