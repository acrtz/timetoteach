import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocumentLoader } from "@/components/document-loader";
import { DocumentSidebar } from "@/components/document-sidebar";

export default async function Page({
  params,
}: {
  params: Promise<{ document_id: string }>;
}) {
  const { document_id } = await params;
  return (
    <SidebarProvider>
      <main className="relative w-full overflow-hidden">
        <DocumentLoader />
        <SidebarTrigger className="absolute top-5 right-5" />
      </main>
      <DocumentSidebar />
    </SidebarProvider>
  );
}
