/* eslint-disable @next/next/no-img-element -- Google avatar URLs vary by host; no optimisation needed for a 36–56px image. */

/** Google profile photo, or the customer's initial when there is none. */
export function Avatar({ name, image, size }: { name: string; image: string | null; size: number }) {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="rounded-full bg-forest text-white font-semibold flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
