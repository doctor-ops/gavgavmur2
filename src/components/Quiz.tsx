import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useReveal } from '@/hooks/useReveal';
import { Dog, Cat, ArrowRight, ArrowLeft, RotateCcw, Check } from 'lucide-react';

type AnswerType = 'dog' | 'cat';

export function Quiz() {
  const { t } = useLang();
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const totalQuestions = t.quiz.questions.length;

  const handleStart = () => {
    setStarted(true);
    setFinished(false);
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
  };

  const handleSelect = (index: number, type: AnswerType) => {
    setSelected(index);
    const newAnswers = [...answers];
    newAnswers[currentQ] = type;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ + 1 < totalQuestions) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(answers[currentQ - 1] === 'dog' ? 0 : 0);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setFinished(false);
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
  };

  const dogCount = answers.filter((a) => a === 'dog').length;
  const catCount = answers.filter((a) => a === 'cat').length;
  const result: AnswerType = dogCount >= catCount ? 'dog' : 'cat';

  const recommendedDogBreeds = ['Лабрадор-ретривер', 'Корги', 'Немецкая овчарка'];
  const recommendedCatBreeds = ['Британская', 'Мейн-кун', 'Сиамская'];

  const progress = ((currentQ + 1) / totalQuestions) * 100;

  return (
    <section id="quiz" className="py-20 lg:py-28 bg-base-bg">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal ${revealed ? 'revealed' : ''}`}
      >
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            {t.quiz.title}
          </h2>
          <p className="text-lg text-ink-light leading-relaxed">{t.quiz.subtitle}</p>
        </div>

        <div className="rounded-3xl bg-base-surface border border-base-muted shadow-xl overflow-hidden">
          {!started && !finished && (
            <div className="p-8 lg:p-12 text-center">
              {/* Замена bg-honey-soft на bg-accent-soft */}
              <div className="w-20 h-20 rounded-full bg-accent-soft flex items-center justify-center mx-auto mb-6">
                <Dog className="w-8 h-8 text-accent inline mr-1" />
                <Cat className="w-8 h-8 text-brand inline ml-1" />
              </div>
              <button
                onClick={handleStart}
                // Замена bg-honey на bg-accent
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-brand font-bold hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                {t.quiz.start}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {started && !finished && (
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-ink-light">
                  {currentQ + 1} / {totalQuestions}
                </span>
                <div className="flex-1 mx-4 h-2 rounded-full bg-base-muted overflow-hidden">
                  {/* Прогресс-бар в акцентном цвете */}
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <h3 className="font-display font-bold text-xl lg:text-2xl text-ink mb-6">
                {t.quiz.questions[currentQ].question}
              </h3>

              <div className="space-y-3 mb-8">
                {t.quiz.questions[currentQ].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i, option.type)}
                    // Замена border-honey / bg-honey-soft
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                      selected === i
                        ? 'border-accent bg-accent-soft text-ink'
                        : 'border-base-muted bg-base-bg text-ink-soft hover:border-brand/30'
                    }`}
                  >
                    <span className="font-medium">{option.text}</span>
                    {selected === i && (
                      <Check className="w-5 h-5 text-accent flex-shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentQ === 0}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-ink-soft font-semibold hover:bg-base-muted transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.quiz.back}
                </button>
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  // Замена bg-ink на bg-brand
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {currentQ + 1 < totalQuestions ? t.quiz.next : t.quiz.resultTitle}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {finished && (
            <div className="p-8 lg:p-12 text-center animate-scale-in">*
