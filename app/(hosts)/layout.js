import { notFound } from "next/navigation";
import { Sidebar } from "./host/_components/sidebar";


import Header from "@/components/header";

export default async function AdminLayout({ children }) {
 



  return (
    <div className="h-full">
      <Header isAdminPage={true} />
      <div className="flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
}