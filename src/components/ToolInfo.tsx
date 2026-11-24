import { Link } from 'react-router-dom';
import { TOOL_CONTENT, TOOL_SECTION_TITLES as titles } from '@/data/toolContent';

const heading = 'font-display font-bold text-xl text-ink mb-3';
const text = 'text-base text-ink-soft leading-relaxed';
const linkClass = 'text-brand font-semibold underline hover:text-brand-light break-words';

// Методика, пример, ограничения, вопросы и источники инструмента.
export function ToolInfo({ path }: { path: string }) {
  const content = TOOL_CONTENT[path];
  if (!content) return null;

  return (
    <div className="mt-12 rounded-2xl bg-base-surface border border-base-muted p-6 md:p-8 shadow-sm space-y-8">
      {(['method', 'example'] as const).map((key) => (
        <section key={key}>
          <h2 className={heading}>{titles[key]}</h2>
          <div className="space-y-3">
            {content[key].map((item) => (
              <p key={item} className={text}>{item}</p>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2 className={heading}>{titles.limits}</h2>
        <ul className={`list-disc pl-5 space-y-2 ${text}`}>
          {content.limits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={heading}>{titles.faq}</h2>
        <div className="space-y-5">
          {content.faq.map(({ question, answer }) => (
            <div key={question}>
              <h3 className="font-bold text-ink mb-1">{question}</h3>
              <p className={text}>{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={heading}>{titles.sources}</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          {content.sources.map(({ label, href }) => (
            <li key={href}>
              {href.startsWith('/') ? (
                <Link to={href} className={linkClass}>{label}</Link>
              ) : (
                <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{label}</a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
