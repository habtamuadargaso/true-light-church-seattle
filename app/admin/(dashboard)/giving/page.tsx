import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms/queries";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SubmitButton, TextField } from "@/components/admin/fields";
import { updateGivingSettingsAction } from "@/lib/cms/actions/settings";

export const metadata: Metadata = { title: "Giving" };

export default async function AdminGivingPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        title="Giving"
        description={
          settings.giving_url
            ? "The public Give button is live and points to the URL below."
            : "The public site shows \"Online Giving Coming Soon\" until a URL is set here."
        }
      />
      <AdminCard>
        <form action={updateGivingSettingsAction} className="flex flex-col gap-5">
          <TextField
            name="giving_url"
            label="Giving URL"
            defaultValue={settings.giving_url}
            placeholder="https://tithe.ly/give?..."
            hint="Your online giving platform link (Tithe.ly, Pushpay, Give.church, etc). Leave blank to show the Coming Soon state."
          />
          <div>
            <SubmitButton>Save changes</SubmitButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
