"use client";

import { useEffect, useState } from "react";
import { getApiBaseUrl, getOrders } from "../../lib/api";

interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  createdAt: string;
}

interface OrderItem {
  id: number | string;
  productId?: string;
  name: string;
  price: number | string;
  quantity: number;
  size?: string;
}

interface Order {
  id: number | string;
  name: string;
  phone: string;
  address: string;
  notes?: string;
  total?: number | string;
  createdAt?: string;
  created_at?: string;
  items?: OrderItem[];
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const apiBaseUrl = getApiBaseUrl();

      try {
        const [leadResult, orderResult] = await Promise.allSettled([
          fetch(`${apiBaseUrl}/api/admin/leads`).then((res) => res.ok ? res.json() : null).catch(() => null),
          getOrders(),
        ]);

        if (leadResult.status === "fulfilled" && leadResult.value) {
          setLeads(leadResult.value.leads || leadResult.value.data || []);
        }

        if (orderResult.status === "fulfilled" && orderResult.value) {
          const fetchedOrders = orderResult.value.data || orderResult.value.orders || [];
          setOrders(fetchedOrders);
        }
      } catch (error) {
        console.error("Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-cream px-4 py-20 text-forest">
      <div className="mx-auto max-w-6xl space-y-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Admin</p>
          <h1 className="mt-2 font-serif text-4xl">Lead and order dashboard</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            This dashboard displays customer orders stored in the database as well as list signups.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading data...</p>
        ) : (
          <>
            <section className="rounded-3xl border border-parchment bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-2xl">Leads</h2>
                <span className="rounded-full bg-sage/10 px-3 py-1 text-sm text-sage">{leads.length}</span>
              </div>
              <div className="space-y-3">
                {leads.length === 0 ? (
                  <p className="text-gray-500">No leads yet.</p>
                ) : (
                  leads.map((lead) => (
                    <div key={lead.id} className="rounded-2xl border border-parchment bg-cream/60 p-4">
                      <p className="font-semibold">{lead.name}</p>
                      <p className="text-sm text-gray-600">{lead.phone || lead.email || "No contact provided"}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ""}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-parchment bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between border-b border-parchment pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold">Customer Orders ({orders.length})</h2>
                  <p className="text-xs text-gray-500">Live order items & details from PostgreSQL database</p>
                </div>
                <span className="rounded-full bg-forest px-3 py-1 text-sm font-bold text-white">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </span>
              </div>

              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    <p className="font-serif text-lg">No orders in database yet.</p>
                    <p className="text-xs text-gray-400">Place an order via the checkout page to see it here.</p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const dateStr = order.createdAt || order.created_at;
                    return (
                      <div
                        key={order.id}
                        className="overflow-hidden rounded-2xl border border-parchment bg-cream/30 shadow-sm transition-all hover:shadow-md"
                      >
                        {/* Order Header Bar (Flipkart style) */}
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-forest/5 px-5 py-3 border-b border-parchment">
                          <div className="flex items-center gap-3">
                            <span className="rounded-lg bg-forest px-2.5 py-1 text-xs font-extrabold uppercase text-white tracking-wider">
                              ORDER #{order.id}
                            </span>
                            <span className="rounded-full bg-lime/30 px-2.5 py-0.5 text-xs font-semibold text-forest border border-lime/50">
                              ✓ Received
                            </span>
                          </div>
                          {dateStr && (
                            <span className="text-xs text-gray-500">
                              🗓 {new Date(dateStr).toLocaleString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          )}
                        </div>

                        {/* Order Body */}
                        <div className="grid gap-6 p-5 md:grid-cols-5">
                          {/* Customer Details (2 cols) */}
                          <div className="md:col-span-2 space-y-2 border-b border-parchment pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                            <p className="text-xs font-bold uppercase tracking-wider text-sage">Customer Info</p>
                            <p className="text-base font-bold text-forest">{order.name}</p>
                            <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                              📞 <a href={`https://wa.me/91${order.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-forest underline hover:text-leaf">
                                {order.phone}
                              </a>
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              📍 <span className="font-normal">{order.address}</span>
                            </p>
                            {order.notes && (
                              <div className="mt-2 rounded-xl bg-white p-2.5 border border-parchment/60 text-xs text-gray-600">
                                <span className="font-semibold text-bark">Order Note:</span> <span className="italic">{order.notes}</span>
                              </div>
                            )}
                          </div>

                          {/* Purchased Products List (Flipkart Style - 3 cols) */}
                          <div className="md:col-span-3 space-y-3">
                            <p className="text-xs font-bold uppercase tracking-wider text-sage">Ordered Products</p>
                            {order.items && order.items.length > 0 ? (
                              <div className="divide-y divide-parchment/60 rounded-xl bg-white border border-parchment overflow-hidden">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 gap-3 text-sm">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-cream font-bold text-forest text-xs border border-parchment">
                                        🌱
                                      </div>
                                      <div className="min-w-0">
                                        <p className="font-semibold text-forest truncate">{item.name}</p>
                                        <p className="text-xs text-gray-400">
                                          {item.size ? `Size: ${item.size} · ` : ""}Quantity: <span className="font-bold text-forest">{item.quantity}</span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="font-bold text-forest">₹{Number(item.price) * item.quantity}</p>
                                      <p className="text-[10px] text-gray-400">₹{item.price} each</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs italic text-gray-400">No individual item details stored.</p>
                            )}

                            {/* Summary Footer */}
                            <div className="flex justify-between items-center pt-2 border-t border-parchment">
                              <span className="text-xs font-semibold text-gray-500">Total Order Value</span>
                              <span className="text-lg font-extrabold text-forest">
                                ₹{order.total ?? 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

