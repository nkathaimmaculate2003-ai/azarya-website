/**
 * Legal awareness articles and frequently asked questions.
 *
 * EDIT HERE to add or update articles. Each article gets its own page at
 * /legal-awareness/<slug>. Keep `published` and `reviewed` dates current, and
 * review legal or procedural information regularly.
 *
 * Article body format: an array of sections, each with an optional heading and
 * a list of paragraphs and/or bullet points.
 */

export type ArticleSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, e.g. "2026-10-29" */
  published: string;
  /** ISO date the content was last reviewed for accuracy. */
  reviewed: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "what-is-mediation",
    title: "What is mediation? A plain-language introduction",
    summary:
      "An introduction to mediation: what it is, who is involved and what it can and cannot do.",
    published: "2026-10-29",
    reviewed: "2026-10-29",
    sections: [
      {
        paragraphs: [
          "Mediation is a way of working through a disagreement with the help of a neutral person, called a mediator. The mediator does not take sides and does not decide who is right. Instead, they help the people involved talk, listen and look for a way forward that everyone can accept.",
        ],
      },
      {
        heading: "Key features of mediation",
        bullets: [
          "It is voluntary. People choose to take part and can usually stop at any time.",
          "The mediator is neutral. Their role is to guide the conversation, not to judge.",
          "The people involved make the decisions. Any agreement is reached together, not imposed.",
          "It focuses on the future, on what can work from here, as well as on what went wrong.",
        ],
      },
      {
        heading: "What mediation cannot do",
        paragraphs: [
          "Mediation does not always lead to an agreement, and it is not right for every situation. A mediator cannot give legal advice to either side, and mediation is not a substitute for a court where a formal decision or legal protection is needed.",
          "In Kenya, the Constitution encourages alternative forms of dispute resolution, including mediation, alongside the courts. Whether mediation is the right step depends on the circumstances of each situation.",
        ],
      },
      {
        heading: "Where to learn more",
        paragraphs: [
          "Our Mediation Explained page describes typical steps in more detail, along with situations where mediation may not be suitable.",
        ],
      },
    ],
  },
  {
    slug: "is-my-dispute-suitable-for-mediation",
    title: "Is my dispute suitable for mediation?",
    summary:
      "Questions to think through before choosing mediation, including when it may not be safe or appropriate.",
    published: "2026-10-29",
    reviewed: "2026-10-29",
    sections: [
      {
        paragraphs: [
          "Mediation can help in many everyday disagreements, but not all of them. These questions may help you think about whether it could be a good option for you.",
        ],
      },
      {
        heading: "Signs mediation may help",
        bullets: [
          "Everyone involved is willing to talk, even if it is difficult.",
          "People want to keep, or at least manage, an ongoing relationship, such as between family members, neighbours or colleagues.",
          "Each person can speak freely and make their own decisions without pressure.",
          "The issue is about finding a practical way forward.",
        ],
      },
      {
        heading: "When mediation may not be suitable",
        bullets: [
          "There is violence, threats, intimidation or coercion.",
          "Someone is afraid of the other person, or cannot speak freely.",
          "There is a serious imbalance of power that a neutral process cannot safely manage.",
          "Someone urgently needs legal protection, or a formal court decision is required.",
          "A crime may have been committed.",
        ],
      },
      {
        heading: "If you are unsure",
        paragraphs: [
          "It is fine not to know. A qualified legal professional can advise on your specific situation. If your safety is at risk, please seek emergency or protection support first.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-a-mediation-conversation",
    title: "Preparing for a mediation conversation",
    summary:
      "Practical tips to help you feel ready if you decide to take part in mediation.",
    published: "2026-10-29",
    reviewed: "2026-10-29",
    sections: [
      {
        paragraphs: [
          "If you have decided mediation may be right for you, a little preparation can help you feel more confident.",
        ],
      },
      {
        heading: "Before the conversation",
        bullets: [
          "Write down the main issues as you see them, in a few short points.",
          "Think about what matters most to you, and what you could be flexible about.",
          "Consider how the other person might see the situation.",
          "Ask the mediator about how the process works, confidentiality and any costs before you begin.",
        ],
      },
      {
        heading: "During the conversation",
        bullets: [
          "Take your time. You can ask for a pause if you need one.",
          "Speak about your own experience and needs, rather than blaming.",
          "Ask questions if something is not clear.",
          "You do not have to agree to anything you are not comfortable with.",
        ],
      },
      {
        heading: "After the conversation",
        paragraphs: [
          "If an agreement is reached, make sure you understand it fully. For important matters, you may wish to have a qualified legal professional review it before you rely on it.",
        ],
      },
    ],
  },
  {
    slug: "finding-qualified-legal-help",
    title: "Finding qualified legal help",
    summary:
      "How to think about when you may need a qualified legal professional, and questions to ask.",
    published: "2026-10-29",
    reviewed: "2026-10-29",
    sections: [
      {
        paragraphs: [
          "General information like this website can help you understand your options, but some situations need advice from a qualified legal professional who can look at your particular circumstances.",
        ],
      },
      {
        heading: "When to consider professional legal advice",
        bullets: [
          "You have received court papers, a legal notice or a deadline.",
          "Your matter involves property, inheritance, employment, custody or significant money.",
          "You have been accused of an offence, or you believe a crime has been committed against you.",
          "You are being asked to sign a legal agreement and are unsure what it means.",
        ],
      },
      {
        heading: "Questions to ask a legal professional",
        bullets: [
          "Are you qualified and permitted to practise on this type of matter?",
          "What are your fees, and are there any other costs I should expect?",
          "What are my options, including options that do not involve going to court?",
          "What documents should I bring?",
        ],
      },
      {
        heading: "How Azarya can help",
        paragraphs: [
          "Where appropriate, we can help you identify qualified legal professionals or relevant services. A referral does not guarantee that a professional or service will take on your matter.",
        ],
      },
    ],
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Is Azarya a law firm?",
    answer:
      "No. Azarya Justice and Mediation Hub is a community-based organisation that shares information about mediation and access to justice, supports community awareness and, where appropriate, helps people find qualified legal professionals or relevant services. We do not provide legal representation.",
  },
  {
    question: "Can you give me legal advice about my situation?",
    answer:
      "Information on this website and in our sessions is general awareness, not individual legal advice. For advice on your specific circumstances, please speak to a qualified legal professional. Where appropriate, we can help you identify one.",
  },
  {
    question: "Is every dispute suitable for mediation?",
    answer:
      "No. Mediation may not be appropriate where there is violence, coercion, intimidation, a serious safety concern or a significant imbalance of power, or where a formal legal process is needed.",
  },
  {
    question: "Will mediation definitely solve my problem?",
    answer:
      "Not always. Mediation is voluntary and depends on everyone involved being willing to take part. It can help people find a way forward, but an agreement is never guaranteed.",
  },
  {
    question: "Do your services cost anything?",
    answer:
      "Please contact us to ask about the support available and whether any costs apply. Services offered by professionals we refer you to may have their own fees.",
  },
  {
    question: "What should I do if I am in danger?",
    answer:
      "Our contact form is not an emergency service. If you or someone else is in immediate danger, contact the police, emergency services or a qualified protection and support service straight away.",
  },
];
