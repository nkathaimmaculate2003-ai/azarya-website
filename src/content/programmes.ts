/**
 * Community programmes.
 *
 * EDIT HERE to add programmes. Always set `status` honestly:
 *   - "planned"   = proposed or upcoming, not yet delivered
 *   - "ongoing"   = currently running
 *   - "completed" = already delivered
 * Do not list a programme as completed unless it actually took place, and do
 * not add results, numbers of participants or photos without verification and
 * permission.
 */

export type ProgrammeStatus = "planned" | "ongoing" | "completed";

export type Programme = {
  title: string;
  status: ProgrammeStatus;
  description: string;
  /** Where it happens, if confirmed. */
  location?: string;
  /** When it happens, if confirmed. */
  date?: string;
  /** Who it is for. */
  audience?: string;
};

export const statusLabels: Record<ProgrammeStatus, string> = {
  planned: "Planned",
  ongoing: "Ongoing",
  completed: "Completed",
};

/**
 * Proposed programme areas, based on the organisation's stated objectives.
 * These are all labelled "planned". Dates and locations are left empty until
 * confirmed.
 */
export const programmes: Programme[] = [
  {
    title: "Community mediation awareness sessions",
    status: "planned",
    description:
      "Plain-language sessions explaining what mediation is, how it works and when it may or may not be suitable.",
    audience: "Residents, community groups and local leaders",
  },
  {
    title: "Access-to-justice information sessions",
    status: "planned",
    description:
      "Sessions that help community members understand justice-related processes, their possible options and where to find qualified help.",
    audience: "Residents and community members",
  },
  {
    title: "Youth dialogue and conflict-management sessions",
    status: "planned",
    description:
      "Interactive sessions on communication, negotiation and peaceful approaches to disagreements.",
    audience: "Youth and youth groups",
  },
  {
    title: "Community dialogue forums",
    status: "planned",
    description:
      "Facilitated conversations that encourage respectful dialogue and understanding on community-level issues.",
    audience: "Community members, groups and leaders",
  },
];
