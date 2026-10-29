import type { Faq } from "@/content/resources";

/**
 * Frequently asked questions using native <details>/<summary>, which work with
 * keyboard and screen readers without any JavaScript.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-mist rounded-lg border border-mist bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="group p-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span aria-hidden="true" className="mt-0.5 text-xl leading-none text-teal transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
