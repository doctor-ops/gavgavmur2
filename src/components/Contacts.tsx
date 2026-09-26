import { useState, type FormEvent } from 'react';
import { useLang } from '@/context/LangContext';
import { useReveal } from '@/hooks/useReveal';
import { Mail, MapPin, Send, CheckCircle, User, MessageSquare, Tag } from 'lucide-react';

export function Contacts() {
  const { t, lang } = useLang();
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: t.contacts.subjects[0], message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = lang === 'ru' ? 'Введите имя' : 'Enter your name';
    if (!form.email.trim()) e.email = lang === 'ru' ? 'Введите email' : 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = lang === 'ru' ? 'Некорректный email' : 'Invalid email';
    if (!form.message.trim()) e.message = lang === 'ru' ? 'Введите сообщение' : 'Enter your message';
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: t.contacts.subjects[0], message: '' });
    }
  };

  return (
    <section id="contacts" className="py-20 lg:py-28 bg-base-bg">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal ${revealed ? 'revealed' : ''}`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            {t.contacts.title}
          </h2>
          <p className="text-lg text-ink-light leading-relaxed">{t.contacts.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl bg-brand p-8 text-white shadow-xl">
              <h3 className="font-display font-bold text-xl mb-6">{t.contacts.contactInfo}</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-1">{t.contacts.emailLabel}</p>
                    <p className="font-medium">info@usyhvost.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-1">{t.contacts.address}</p>
                    <p className="font-medium">{t.contacts.addressValue}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-white/60 mb-3">{t.contacts.socialLabel}</p>
                <div className="flex gap-3">
                  {['VK', 'TG', 'YT'].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent flex items-center justify-center text-sm font-bold transition-colors hover:text-white"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-base-surface border border-base-muted p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-2">{t.contacts.success}</h3>
                  <p className="text-ink-light mb-6">{t.contacts.successDesc}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-base-bg border border-base-muted text-ink font-semibold hover:border-accent hover:text-accent transition-all"
                  >
                    {lang === 'ru' ? 'Отправить ещё' : 'Send another'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-2">
                      <User className="w-4 h-4 text-accent" />
                      {t.contacts.name}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-base-bg border-2 transition-all focus:outline-none focus:border-accent ${
                        errors.name ? 'border-error' : 'border-base-muted'
                      }`}
                      placeholder={t.contacts.name}
                    />
                    {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-2">
                      <Mail className="w-4 h-4 text-accent" />
                      {t.contacts.email}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-base-bg border-2 transition-all focus:outline-none focus:border-accent ${
                        errors.email ? 'border-error' : 'border-base-muted'
                      }`}
                      placeholder="example@mail.ru"
                    />
                    {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-2">
                      <Tag className="w-4 h-4 text-accent" />
                      {t.contacts.subject}
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-base-bg border-2 border-base-muted transition-all focus:outline-none focus:border-accent"
                    >
                      {t.contacts.subjects.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-2">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      {t.contacts.message}
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-base-bg border-2 transition-all focus:outline-none focus:border-accent resize-none ${
                        errors.message ? 'border-error' : 'border-base-muted'
                      }`}
                      placeholder={t.contacts.message}
                    />
                    {errors.message && <p className="text-xs text-error mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-brand font-semibold hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 w-full justify-center"
                  >
                    <Send className="w-4 h-4" />
                    {t.contacts.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
