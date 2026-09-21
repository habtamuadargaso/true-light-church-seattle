import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms/queries";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SubmitButton, TextField } from "@/components/admin/fields";
import { updateContactSettingsAction } from "@/lib/cms/actions/settings";

export const metadata: Metadata = { title: "Contact Info" };

export default async function AdminContactPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        title="Contact Info"
        description="The address and service times are already correct and managed elsewhere in the codebase. This is only for a public email/phone, which isn't shown until set here."
      />
      <AdminCard>
        <form action={updateContactSettingsAction} className="flex flex-col gap-5">
          <TextField
            name="church_email"
            label="Public email"
            type="email"
            defaultValue={settings.church_email}
            placeholder="info@truelightseattle.org"
          />
          <TextField
            name="church_phone"
            label="Public phone"
            type="tel"
            defaultValue={settings.church_phone}
            placeholder="(555) 123-4567"
          />
          <div>
            <SubmitButton>Save changes</SubmitButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
