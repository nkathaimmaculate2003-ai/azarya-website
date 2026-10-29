/**
 * The six confirmed service areas.
 *
 * EDIT HERE to change service names, summaries or descriptions. The Services
 * page, homepage cards and contact form options all read from this list.
 * Keep wording careful: do not promise outcomes, free services, legal
 * representation or accreditation unless the organisation has confirmed them.
 */

export type Service = {
  /** Used as the anchor on /services, e.g. /services#mediation */
  id: string;
  title: string;
  summary: string;
  description: string[];
  /** Plain-language examples of what this can involve. */
  mayInclude: string[];
  /** An important limitation or caution for this service. */
  note?: string;
};

export const services: Service[] = [
  {
    id: "mediation",
    title: "Mediation and dispute resolution",
    summary:
      "Information and support about mediation and other suitable ways to resolve disagreements.",
    description: [
      "Mediation is a process where a neutral person helps people in a disagreement talk to each other, understand the issues and explore outcomes they can both accept.",
      "We share information about how mediation works and help people think about whether it may suit their situation, or whether another pathway would be more appropriate.",
    ],
    mayInclude: [
      "Explaining how mediation works and what to expect",
      "Helping people consider whether their dispute may be suitable for mediation",
      "Sharing information about other dispute-resolution options",
    ],
    note: "Mediation is voluntary and outcomes are not guaranteed. Some matters need formal legal processes instead.",
  },
  {
    id: "family-mediation",
    title: "Family and relationship conflict mediation",
    summary:
      "Awareness and information about mediation for suitable family or relationship disagreements.",
    description: [
      "Family and relationship disagreements can be painful and complicated. For some families, a calm, structured conversation with a neutral person can help.",
      "We provide awareness and information about how mediation can support suitable family or relationship disagreements.",
    ],
    mayInclude: [
      "Information about family mediation and how it differs from court processes",
      "Help thinking through whether mediation is a safe and suitable option",
      "Information about where to find further support",
    ],
    note: "Mediation may not be appropriate where there is coercion, violence, intimidation or a serious safety concern. If safety is at risk, please seek urgent professional or protection support.",
  },
  {
    id: "legal-awareness",
    title: "Legal awareness and access to justice",
    summary:
      "Community information sessions and resources about justice processes, options and where to find qualified help.",
    description: [
      "Many people face practical, financial, social or information barriers when trying to understand justice processes.",
      "Our community-focused information sessions and educational resources aim to help people understand possible options and where to seek qualified help.",
    ],
    mayInclude: [
      "Community information and awareness sessions",
      "Plain-language educational resources",
      "Guidance on where to seek qualified help",
    ],
    note: "This is general information, not personalised legal advice.",
  },
  {
    id: "referrals",
    title: "Referrals to qualified legal professionals",
    summary:
      "Where appropriate, help identifying or connecting with qualified legal professionals or relevant services.",
    description: [
      "Some matters need advice or representation from a qualified legal professional, or support from a specialist service.",
      "Where appropriate, we help people identify or connect with qualified legal professionals or relevant services.",
    ],
    mayInclude: [
      "Helping people understand what kind of professional help they may need",
      "Information about relevant services they could approach",
    ],
    note: "A referral does not guarantee that a professional or service will take on a matter, and referred services may have their own fees or requirements.",
  },
  {
    id: "peacebuilding",
    title: "Community conflict resolution and peacebuilding",
    summary:
      "Promoting dialogue, understanding and peaceful approaches to community-level disagreements.",
    description: [
      "Disagreements within neighbourhoods, groups and communities affect everyone. Respectful dialogue can help people understand each other and find ways forward.",
      "We promote dialogue, understanding and peaceful approaches to community-level disagreements through awareness and engagement activities.",
    ],
    mayInclude: [
      "Community awareness and engagement activities",
      "Encouraging respectful dialogue between community members",
    ],
  },
  {
    id: "consultancy",
    title: "Negotiation and conflict management consultancy",
    summary:
      "Educational or advisory support on negotiation, communication and conflict management for groups and organisations.",
    description: [
      "Groups and organisations sometimes want to build skills in handling disagreements constructively.",
      "We offer educational or advisory support on negotiation, communication and conflict management, depending on our capacity and the scope of the request.",
    ],
    mayInclude: [
      "Sessions on communication and negotiation skills",
      "Conversations about conflict management approaches for a group or organisation",
    ],
    note: "Availability depends on the organisation's capacity. Please get in touch to discuss your needs.",
  },
];
