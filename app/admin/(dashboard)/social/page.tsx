import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms/queries";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SubmitButton, TextField } from "@/components/admin/fields";
import { updateSocialLinksAction } from "@/lib/cms/actions/settings";

export const metadata: Metadata = { title: "Social Links" };

export default async function AdminSocialPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        title="Social Links"
        description="Each icon only appears on the public site once its URL is set here — leave a field blank to keep it hidden."
      />
      <AdminCard>
        <form action={updateSocialLinksAction} className="flex flex-col gap-5">
          <TextField
            name="facebook_url"
            label="Facebook"
            defaultValue={settings.facebook_url}
            placeholder="https://facebook.com/..."
          />
          <TextField
            name="tiktok_url"
            label="TikTok"
            defaultValue={settings.tiktok_url}
            placeholder="https://tiktok.com/@..."
          />
          <TextField
            name="youtube_channel_url"
            label="YouTube channel"
            defaultValue={settings.youtube_channel_url}
            placeholder="https://youtube.com/@..."
            hint="The channel itself — individual sermon videos are managed under Sermons."
          />
          <div>
            <SubmitButton>Save changes</SubmitButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
