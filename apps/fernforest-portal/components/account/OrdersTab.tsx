import Link from "next/link";
import type { Order } from "@fernforest/shared-types";
import { Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function OrdersTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
        <Package className="h-12 w-12 text-parchment mx-auto mb-4" />
        <h2 className="font-serif text-xl text-forest mb-2">No orders yet</h2>
        <p className="text-sm text-gray-500 mb-6">
          Orders you place while signed in will show up here.
        </p>
        <Link
          href="/#varieties"
          className="inline-flex items-center gap-2 bg-forest text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-leaf transition-colors"
        >
          Browse microgreens
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <div>
              <p className="font-semibold text-forest">Order #{order.id}</p>
              <p className="text-xs text-gray-400">{dateFormat.format(new Date(order.createdAt))}</p>
            </div>
            <p className="font-bold text-forest">{formatPrice(Number(order.total))}</p>
          </div>

          <ul className="divide-y divide-parchment text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 py-2">
                <span className="text-bark min-w-0">
                  {item.name}
                  {item.size ? <span className="text-gray-400"> · {item.size}</span> : null}
                  <span className="text-gray-400"> × {item.quantity}</span>
                </span>
                <span className="text-gray-600 whitespace-nowrap">
                  {formatPrice(Number(item.price) * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-gray-500">
            Delivered to <span className="text-bark">{order.address}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
