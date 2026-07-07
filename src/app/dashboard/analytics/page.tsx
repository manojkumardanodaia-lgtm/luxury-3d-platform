import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";

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

export default async function AnalyticsPage() {
  const orders = await getOrders();

  const paidOrders = orders.filter((x: any) => x.status === "Paid");

  const revenue = paidOrders.reduce(
    (sum: number, order: any) => sum + Number(order.amount || 0),
    0
  );

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <DashboardHeader
        title="Analytics"
        subtitle="Sales, revenue and marketplace performance."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Revenue" value={`₹${revenue}`} />
        <StatsCard title="Paid Orders" value={paidOrders.length} />
        <StatsCard title="Total Orders" value={orders.length} />
        <StatsCard title="Conversion" value="Demo" />
      </div>

      <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-black">Top Sales</h2>

        {paidOrders.length === 0 ? (
          <p className="mt-6 text-sm text-neutral-500">
            No paid sales yet.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {paidOrders.slice(0, 10).map((order: any) => (
              <div
                key={order._id}
                className="flex items-center justify-between rounded-2xl bg-neutral-50 p-4"
              >
                <div>
                  <h3 className="font-bold text-black">
                    {order.productName}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {order.customerEmail}
                  </p>
                </div>

                <p className="font-bold text-black">
                  ₹{order.amount || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}