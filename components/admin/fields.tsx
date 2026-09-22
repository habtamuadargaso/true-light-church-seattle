const inputClasses =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-[15px] focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, htmlFor, required, hint, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

interface FieldProps {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  type?: string;
  list?: string;
}

export function TextField({ name, label, defaultValue, required, placeholder, hint, type = "text", list }: FieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={name} required={required} hint={hint}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        list={list}
        className={inputClasses}
      />
    </FieldWrapper>
  );
}

export function TextAreaField({ name, label, defaultValue, required, placeholder, hint }: FieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={name} required={required} hint={hint}>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        rows={4}
        className={`${inputClasses} resize-y`}
      />
    </FieldWrapper>
  );
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
  hint,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
        <input
          id={name}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy/30"
        />
        {label}
      </label>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  );
}

export function DangerButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
    >
      {children}
    </button>
  );
}
