"use client";

import { useState } from "react";
import type { Address, NewAddress } from "@fernforest/shared-types";
import toast from "react-hot-toast";
import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { addAddress, editAddress, fetchAddresses, removeAddress } from "@/lib/api";
import { isValidIndianMobile, LIMITS } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type FormState = { label: string; name: string; phone: string; address: string; isDefault: boolean };
type FormErrors = Partial<Record<"name" | "phone" | "address", string>>;

const EMPTY: FormState = { label: "Home", name: "", phone: "", address: "", isDefault: false };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!isValidIndianMobile(form.phone)) errors.phone = "Enter a valid 10-digit Indian mobile number";
  if (!form.address.trim()) errors.address = "Delivery address is required";
  return errors;
}

export function AddressesTab({
  addresses,
  onChange,
}: {
  addresses: Address[];
  onChange: (addresses: Address[]) => void;
}) {
  // null = closed, "new" = adding, number = editing that address
  const [editing, setEditing] = useState<"new" | number | null>(addresses.length === 0 ? "new" : null);
  const [busyId, setBusyId] = useState<number | null>(null);

  // Default-address changes touch several rows, so reload the list after writes.
  const reload = async () => onChange(await fetchAddresses());

  const handleSave = async (form: FormState) => {
    const payload: NewAddress = { ...form, label: form.label.trim() || "Home" };
    if (editing === "new") {
      await addAddress(payload);
      toast.success("Address saved");
    } else if (typeof editing === "number") {
      await editAddress(editing, payload);
      toast.success("Address updated");
    }
    await reload();
    setEditing(null);
  };

  const run = async (id: number, action: () => Promise<unknown>, success: string) => {
    setBusyId(id);
    try {
      await action();
      await reload();
      toast.success(success);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = (address: Address) => {
    if (!window.confirm(`Delete the "${address.label}" address?`)) return;
    void run(address.id, () => removeAddress(address.id), "Address deleted");
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) =>
        editing === address.id ? (
          <AddressForm
            key={address.id}
            initial={{ ...address }}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <div
            key={address.id}
            className={cn(
              "bg-white rounded-2xl border p-5 flex gap-4",
              address.isDefault ? "border-sage/50" : "border-gray-100"
            )}
          >
            <MapPin className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-forest">{address.label}</p>
                {address.isDefault && (
                  <span className="rounded-full bg-lime/30 px-2 py-0.5 text-[11px] font-semibold text-forest">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-bark">{address.name} · +91 {address.phone}</p>
              <p className="text-sm text-gray-500 whitespace-pre-line break-words">{address.address}</p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <button
                  type="button"
                  onClick={() => setEditing(address.id)}
                  disabled={busyId !== null}
                  className="inline-flex items-center gap-1.5 font-semibold text-leaf hover:text-forest disabled:opacity-50"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => run(address.id, () => editAddress(address.id, { isDefault: true }), "Default address updated")}
                    disabled={busyId !== null}
                    className="inline-flex items-center gap-1.5 font-semibold text-leaf hover:text-forest disabled:opacity-50"
                  >
                    <Star className="h-3.5 w-3.5" /> Make default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(address)}
                  disabled={busyId !== null}
                  className="inline-flex items-center gap-1.5 font-semibold text-red-500 hover:text-red-600 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" /> {busyId === address.id ? "Working…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )
      )}

      {editing === "new" ? (
        <AddressForm
          initial={{ ...EMPTY, isDefault: addresses.length === 0 }}
          onSave={handleSave}
          onCancel={addresses.length > 0 ? () => setEditing(null) : undefined}
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing("new")}
          disabled={editing !== null}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sage/40 py-4 text-sm font-semibold text-leaf hover:border-sage hover:bg-white transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Add a new address
        </button>
      )}
    </div>
  );
}

const inputClass = (hasError?: boolean) =>
  cn(
    "w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 transition",
    hasError ? "border-red-400 bg-red-50" : "border-parchment bg-cream"
  );

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: FormState;
  onSave: (form: FormState) => Promise<void>;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const set = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this address");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-sage/40 p-5 sm:p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Label" htmlFor="addr-label">
          <input
            id="addr-label"
            value={form.label}
            onChange={(e) => set("label", e.target.value)}
            placeholder="Home, Office…"
            maxLength={LIMITS.label}
            className={inputClass()}
          />
        </Field>
        <Field label="Full name *" htmlFor="addr-name" error={errors.name}>
          <input
            id="addr-name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            maxLength={LIMITS.name}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>
      </div>

      <Field label="Phone number *" htmlFor="addr-phone" error={errors.phone}>
        <div className="flex">
          <span className="flex items-center px-4 border border-r-0 border-parchment rounded-l-xl bg-parchment text-sm text-gray-500">
            +91
          </span>
          <input
            id="addr-phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel-national"
            maxLength={12}
            placeholder="9876543210"
            className={cn(inputClass(Boolean(errors.phone)), "rounded-l-none")}
          />
        </div>
      </Field>

      <Field label="Delivery address *" htmlFor="addr-address" error={errors.address}>
        <textarea
          id="addr-address"
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder="Flat No, Building, Street, Area, Bengaluru — PIN"
          rows={3}
          maxLength={LIMITS.address}
          autoComplete="street-address"
          className={cn(inputClass(Boolean(errors.address)), "resize-none")}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-bark">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => set("isDefault", e.target.checked)}
          className="h-4 w-4 accent-forest"
        />
        Use as my default delivery address
      </label>

      <div className="flex gap-3 pt-1">
        <Button type="submit" size="sm" loading={saving}>
          Save address
        </Button>
        {onCancel && (
          <Button type="button" size="sm" variant="ghost" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-bark mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
