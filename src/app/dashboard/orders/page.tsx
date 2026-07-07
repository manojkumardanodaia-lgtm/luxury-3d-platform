import DashboardHeader from "@/components/dashboard/DashboardHeader";

async function getOrders() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/orders`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.orders || [];
  } catch {
    return [];
  }
}

export default async function DashboardOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <DashboardHeader
        title="Orders"
        subtitle="Track purchases, payments and download access."
      />

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-bold text-black">No orders yet</p>
          <p className="mt-2 text-sm text-neutral-500">
            Paid asset purchases will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid grid-cols-5 gap-4 border-b border-neutral-200 bg-neutral-50 p-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
            <div>Asset</div>
            <div>Customer</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Date</div>
          </div>

          {orders.map((order: any) => (
            <div
              key={order._id}
              className="grid grid-cols-5 gap-4 border-b border-neutral-100 p-4 text-sm last:border-b-0"
            >
              <div className="font-semibold text-black">
                {order.productName || "Asset"}
              </div>

              <div className="text-neutral-600">
                {order.customerEmail || "Guest"}
              </div>

              <div className="font-bold text-black">₹{order.amount || 0}</div>

              <div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700">
                  {order.status}
                </span>
              </div>

              <div className="text-neutral-500">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}