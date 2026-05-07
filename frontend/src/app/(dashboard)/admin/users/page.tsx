import { AdminUsersTable } from "@/src/features/admin/components/AdminUsersTable";

export default function AdminUsersPage() {
  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen bg-slate-50/30 dark:bg-slate-950/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-10 bg-primary shrink-0" />
          <div className="space-y-0.5">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white leading-none whitespace-nowrap">
              User <span className="text-primary">Management</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Control and Monitor Platform Membership
            </p>
          </div>
        </div>
      </div>

      <AdminUsersTable />
    </div>
  );
}
