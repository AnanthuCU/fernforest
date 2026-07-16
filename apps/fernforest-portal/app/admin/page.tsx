"use client";

import { useEffect, useState } from "react";
import { getApiBaseUrl } from "../../lib/api";

interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  createdAt: string;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  notes?: string;
  total?: number;
  createdAt: string;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const apiBaseUrl = getApiBaseUrl();

      try {
        const [leadRes, orderRes] = await Promise.all([
          fetch(`${apiBaseUrl}/api/admin/leads`),
          fetch(`${apiBaseUrl}/api/admin/orders`),
        ]);

        const leadData = await leadRes.json();
        const orderData = await orderRes.json();

        setLeads(leadData.leads || []);
        setOrders(orderData.orders || []);
      } catch (error) {
        console.error(error);
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
            This simple dashboard shows the latest people who joined the list and the orders submitted through the storefront.
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
                      <p className="mt-1 text-xs text-gray-400">{new Date(lead.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-parchment bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-2xl">Orders</h2>
                <span className="rounded-full bg-sage/10 px-3 py-1 text-sm text-sage">{orders.length}</span>
              </div>
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <p className="text-gray-500">No orders yet.</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="rounded-2xl border border-parchment bg-cream/60 p-4">
                      <p className="font-semibold">{order.name}</p>
                      <p className="text-sm text-gray-600">{order.phone}</p>
                      <p className="text-sm text-gray-600">{order.address}</p>
                      {order.notes && <p className="text-sm text-gray-500">{order.notes}</p>}
                      {order.total !== undefined && <p className="mt-1 text-sm font-semibold text-sage">Total: ₹{order.total}</p>}
                      <p className="mt-1 text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
