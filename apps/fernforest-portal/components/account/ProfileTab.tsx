"use client";

import { useState } from "react";
import type { CustomerProfile } from "@fernforest/shared-types";
import toast from "react-hot-toast";
import { saveProfile } from "@/lib/api";
import { isValidIndianMobile, LIMITS } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Field } from "./AddressesTab";

export function ProfileTab({
  profile,
  onChange,
}: {
  profile: CustomerProfile;
  onChange: (profile: CustomerProfile) => void;
}) {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [saving, setSaving] = useState(false);

  const dirty = name.trim() !== profile.name || phone.trim() !== (profile.phone ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Name is required";
    if (phone.trim() && !isValidIndianMobile(phone)) errs.phone = "Enter a valid 10-digit Indian mobile number";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSaving(true);
    try {
      const updated = await saveProfile({ name: name.trim(), phone: phone.trim() || null });
      onChange(updated);
      setName(updated.name);
      setPhone(updated.phone ?? "");
      toast.success("Profile saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your profile");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    cn(
      "w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 transition",
      hasError ? "border-red-400 bg-red-50" : "border-parchment bg-cream"
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-5 max-w-xl">
      <Field label="Full name" htmlFor="profile-name" error={errors.name}>
        <input
          id="profile-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          autoComplete="name"
          maxLength={LIMITS.name}
          className={inputClass(Boolean(errors.name))}
        />
      </Field>

      <Field label="WhatsApp / Phone number" htmlFor="profile-phone" error={errors.phone}>
        <div className="flex">
          <span className="flex items-center px-4 border border-r-0 border-parchment rounded-l-xl bg-parchment text-sm text-gray-500">
            +91
          </span>
          <input
            id="profile-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            autoComplete="tel-national"
            maxLength={12}
            placeholder="9876543210"
            className={cn(inputClass(Boolean(errors.phone)), "rounded-l-none")}
          />
        </div>
      </Field>

      <Field label="Email" htmlFor="profile-email">
        <input
          id="profile-email"
          value={profile.email}
          readOnly
          className="w-full rounded-xl border border-parchment bg-parchment/50 px-4 py-3 text-sm text-gray-500"
        />
        <p className="text-xs text-gray-400 mt-1">Comes from your Google account.</p>
      </Field>

      <Button type="submit" size="sm" loading={saving} disabled={!dirty}>
        Save changes
      </Button>
    </form>
  );
}
