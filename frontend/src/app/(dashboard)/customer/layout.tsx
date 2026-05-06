import { CustomerLayout } from "@/src/features/customers/components/CustomerLayout";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerLayout>
      {children}
    </CustomerLayout>
  );
}
