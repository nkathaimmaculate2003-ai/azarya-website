import { ButtonLink, Card, PageHeader, Section } from "@/components/ui";
import { programmes, statusLabels, type ProgrammeStatus } from "@/content/programmes";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Community Programmes",
  description:
    "Planned community awareness programmes on mediation, access to justice and peaceful dialogue in Kasarani and Nairobi, and how to take part.",
  path: "/community-programmes",
});

const groups: { status: ProgrammeStatus; heading: string; empty: string }[] = [
  {
    status: "ongoing",
    heading: "Current programmes",
    empty: "There are no ongoing programmes to show at the moment.",
  },
  {
    status: "planned",
    heading: "Planned programmes",
    empty: "There are no planned programmes to show at the moment.",
  },
  {
    status: "completed",
    heading: "Completed activities",
    empty: "No completed activities have been published yet. Activities will be listed here after they have taken place.",
  },
];

export default function CommunityProgrammesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community Programmes"
        title="Community awareness and engagement"
        intro={
          <p>
            We are developing community awareness activities on mediation, access to justice and peaceful dialogue.
            Each programme is clearly labelled as <strong>planned</strong>, <strong>ongoing</strong> or{" "}
            <strong>completed</strong>.
          </p>
        }
      />

      {groups.map((group, index) => {
        const items = programmes.filter((p) => p.status === group.status);
        return (
          <Section key={group.status} id={group.status} title={group.heading} tone={index % 2 === 0 ? "white" : "default"}>
            {items.length === 0 ? (
              <p className="leading-relaxed">{group.empty}</p>
            ) : (
              <ul className="grid gap-6 md:grid-cols-2">
                {items.map((programme) => (
                  <li key={programme.title}>
                    <Card className="h-full">
                      <p className="inline-block rounded-full border border-teal px-3 py-0.5 text-sm font-semibold text-teal">
                        <span className="sr-only">Status: </span>
                        {statusLabels[programme.status]}
                      </p>
                      <h3 className="mt-3 font-heading text-xl font-bold text-navy">{programme.title}</h3>
                      <p className="mt-2 leading-relaxed">{programme.description}</p>
                      <dl className="mt-4 space-y-1 text-sm">
                        {programme.audience && (
                          <div>
                            <dt className="inline font-semibold">For: </dt>
                            <dd className="inline">{programme.audience}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="inline font-semibold">Where: </dt>
                          <dd className="inline">{programme.location ?? "Location to be announced"}</dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold">When: </dt>
                          <dd className="inline">{programme.date ?? "Dates to be announced"}</dd>
                        </div>
                      </dl>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        );
      })}

      <Section id="take-part" title="Take part or host a session" tone="mist">
        <p className="max-w-3xl text-lg leading-relaxed">
          Are you part of a community group, youth group, school or local organisation? Get in touch to express
          interest in a future awareness session or to find out when activities are planned.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact">Discuss a Community Awareness Session</ButtonLink>
        </div>
      </Section>
    </>
  );
}
