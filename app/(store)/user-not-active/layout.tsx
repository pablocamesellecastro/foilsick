import GoBackButton from "@/app/components/page/page-card/go-back-button/GoBackButton";
import PageCard from "@/app/components/page/page-card/PageCard";
import PageLayout from "@/app/components/page/page-layout/PageLayout";
import "@/app/styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout>
      <PageCard topRightCorner={<GoBackButton />}>{children}</PageCard>
    </PageLayout>
  );
}
