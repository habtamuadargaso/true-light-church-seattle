"use client";

export function DeleteButton({ confirmMessage = "Delete this item? This can't be undone." }: { confirmMessage?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
      className="text-sm font-medium text-red-600 hover:text-red-700"
    >
      Delete
    </button>
  );
}
