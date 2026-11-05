const controller = {
  owner: "Pablo Cameselle Castro",
  taxId: "53973097D",
  email: "pablocamesellecastro@gmail.com",
};

const dataUse = [
  {
    purpose: "Your account and sign-in",
    data: "Email, name, profile picture (from Google)",
    basis: "Contract",
    kept: "While your account is active",
  },
  {
    purpose: "Your orders",
    data: "Products bought, date, order details",
    basis: "Contract",
    kept: "[confirm legal period with your advisor]",
  },
  {
    purpose: "Payments",
    data: "Handled by [payment provider]; we do not store card details",
    basis: "Contract",
    kept: "Handled by the provider",
  },
  {
    purpose: "Keeping you signed in",
    data: "Strictly necessary session cookies",
    basis: "Strictly necessary",
    kept: "Until the session ends",
  },
];

const providers = [
  "Supabase: database and authentication",
  "Google: sign-in",
  "[Payment provider]: payments",
];

export default function Page() {
  return (
    <div className="p-3 w-full lg:w-7/12 h-full">
      <h1 className="lg:pl-40 text-2xl font-semibold text-neutral-700">
        Privacy
      </h1>
      <p className="lg:pl-40 pt-2 italic text-neutral-500">
        Last updated: 10.28.2026
      </p>
      <p className="lg:pl-40 pt-4 text-justify text-neutral-700">
        We collect only what we need to run your account and deliver what you
        buy. This page explains what that is and what remains in your control.
      </p>

      <section className="pt-6 lg:pl-40">
        <h2 className="font-semibold text-neutral-700">
          I. Who is responsible
        </h2>
        <p className="pt-2 text-justify text-neutral-700">
          The data controller is the owner of foilsick.co. Contact and
          identification details are at the end of this page.
        </p>
      </section>

      <section className="pt-6 lg:pl-40">
        <h2 className="font-semibold text-neutral-700">
          II. What we collect, and why
        </h2>
        <div className="pt-2 overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-700">
            <thead>
              <tr className="">
                <th className="py-2 pr-3">Purpose</th>
                <th className="py-2 pr-3">Data</th>
                <th className="py-2 pr-3">Legal basis</th>
                <th className="py-2">Kept for</th>
              </tr>
            </thead>
            <tbody>
              {dataUse.map((row) => (
                <tr key={row.purpose} className=" border-neutral-200 align-top">
                  <td className="py-2 pr-3">{row.purpose}</td>
                  <td className="py-2 pr-3">{row.data}</td>
                  <td className="py-2 pr-3">{row.basis}</td>
                  <td className="py-2">{row.kept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pt-6 lg:pl-40">
        <h2 className="font-semibold text-neutral-700">
          III. Who we work with
        </h2>
        <ul className="pt-2 list-disc pl-5 text-neutral-700">
          {providers.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="pt-2 text-neutral-700">We do not sell personal data.</p>
      </section>

      <section className="pt-6 lg:pl-40">
        <h2 className="font-semibold text-neutral-700">
          IV. What remains yours
        </h2>
        <p className="pt-2 text-justify text-neutral-700">
          You may ask to access, correct, delete, restrict or object to the use
          of your data, or to receive it in a portable format. We respond within
          one month.
        </p>
      </section>

      <section className="pt-6 lg:pl-40">
        <h2 className="font-semibold text-neutral-700">V. Concerns</h2>
        <p className="pt-2 text-justify text-neutral-700">
          You may raise a concern with the Spanish Data Protection Agency
          (aepd.es).
        </p>
      </section>

      <section className="pt-10 pb-6 lg:pl-40">
        <h2 className="text-sm font-semibold text-neutral-500">
          VI. Contact details
        </h2>
        <p className="pt-1 text-xs text-neutral-500">
          Owner: {controller.owner} · Tax ID: {controller.taxId} · Email:{" "}
          {controller.email}
        </p>
      </section>
    </div>
  );
}
