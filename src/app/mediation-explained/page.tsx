import Link from "next/link";
import { BulletList, ButtonLink, Card, Notice, PageHeader, Section } from "@/components/ui";
import { safetyNotice } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Mediation Explained",
  description:
    "A plain-language guide to mediation in Nairobi: what it is, typical steps, possible benefits, limitations and when mediation may not be suitable.",
  path: "/mediation-explained",
});

/** EDIT HERE: the typical steps of mediation. */
const steps = [
  {
    title: "First contact",
    text: "Someone asks for information about mediation. Each person involved learns what mediation is and how it works.",
  },
  {
    title: "Checking suitability",
    text: "The mediator considers with each person whether mediation is safe and suitable, including any concerns about violence, pressure or power imbalance.",
  },
  {
    title: "Agreeing to take part",
    text: "Everyone involved chooses freely to take part and agrees how the conversation will work, including confidentiality.",
  },
  {
    title: "The mediation conversation",
    text: "With the mediator's help, each person explains their view, listens to the others and identifies the main issues.",
  },
  {
    title: "Exploring options",
    text: "Together, people look at possible ways forward and what might work for everyone.",
  },
  {
    title: "Agreement or next steps",
    text: "If people reach an agreement, it can be written down. If not, they can consider other options, such as advice from a qualified professional.",
  },
];

const benefits = [
  "People keep control over decisions that affect them.",
  "It can encourage respectful communication and understanding.",
  "It can help preserve relationships, for example between family members or neighbours.",
  "It focuses on practical solutions for the future.",
];

const limitations = [
  "It only works when everyone takes part willingly.",
  "An agreement is never guaranteed.",
  "A mediator is neutral and cannot give legal advice to either side.",
  "It may not be quicker or cheaper in every case.",
  "It cannot replace a court where a formal decision or legal protection is needed.",
];

const notSuitable = [
  "There is violence, threats or abuse.",
  "Someone is being pressured, controlled or intimidated.",
  "Someone is afraid of the other person or cannot speak freely.",
  "There is a serious imbalance of power that a neutral process cannot safely manage.",
  "A crime may have been committed.",
  "Someone urgently needs legal protection or a formal court decision.",
];

export default function MediationExplainedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Mediation Explained"
        title="What is mediation and how does it work?"
        intro={
          <p>
            Mediation is a voluntary process where a neutral person, the mediator, helps people in a disagreement talk
            to each other, identify the issues and explore outcomes they can all accept. The mediator does not take
            sides or decide who is right.
          </p>
        }
      />

      <Section id="steps" title="Typical steps in mediation" tone="white">
        <p className="max-w-3xl text-lg leading-relaxed">
          Every mediation is different, but many follow a similar path:
        </p>
        <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-mist bg-offwhite p-6">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-teal font-bold text-white"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-navy">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="benefits-and-limitations" title="Possible benefits and limitations">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-heading text-xl font-bold text-navy">Possible benefits</h3>
            <div className="mt-4">
              <BulletList items={benefits} />
            </div>
          </Card>
          <Card>
            <h3 className="font-heading text-xl font-bold text-navy">Limitations to keep in mind</h3>
            <div className="mt-4">
              <BulletList items={limitations} />
            </div>
          </Card>
        </div>
      </Section>

      <Section id="when-not-suitable" title="When mediation may not be suitable" tone="white">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-lg leading-relaxed">
              Not every dispute should be mediated. Mediation may not be appropriate when:
            </p>
            <div className="mt-4 text-lg">
              <BulletList items={notSuitable} />
            </div>
          </div>
          <Notice kind="safety" title={safetyNotice.title}>
            <p>{safetyNotice.body}</p>
          </Notice>
        </div>
      </Section>

      <Section id="learn-more" title="Learn more">
        <ul className="space-y-2 text-lg">
          <li>
            <Link href="/legal-awareness/is-my-dispute-suitable-for-mediation">Is my dispute suitable for mediation?</Link>
          </li>
          <li>
            <Link href="/legal-awareness/preparing-for-a-mediation-conversation">Preparing for a mediation conversation</Link>
          </li>
          <li>
            <Link href="/legal-awareness/finding-qualified-legal-help">Finding qualified legal help</Link>
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact">Ask a Question</ButtonLink>
          <ButtonLink href="/services#mediation" variant="secondary">
            Our mediation services
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
