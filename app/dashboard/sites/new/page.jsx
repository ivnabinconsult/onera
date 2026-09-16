import SiteForm from "../SiteForm";

export default function NewSitePage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-semibold text-[#111827] mb-8">New Site</h1>
      <SiteForm />
    </div>
  );
}
