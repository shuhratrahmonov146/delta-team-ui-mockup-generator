import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integration Sprints | Silk Road Professionals",
  description:
    "Deploy complex API and system integrations rapidly. SRP's specialized integration sprints deliver secure, connected software architecture in focused cycles.",
  alternates: {
    canonical: "/integration-sprint",
    languages: {
      en: "/integration-sprint",
      "x-default": "/integration-sprint",
    },
  },
};

export default function IntegrationSprintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
