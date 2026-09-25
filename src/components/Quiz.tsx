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
  const recommendedEnDog = ['Labrador Retriever', 'Corgi', 'German Shepherd'];
  const recommendedEnCat = ['British Shorthair', 'Maine Coon', 'Siamese'];

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
              <div className="w-20 h-20 rounded-full bg-honey-soft flex items-center justify-center mx-auto mb-6">
                <Dog className="w-8 h-8 text-honey inline mr-1" />
                <Cat className="w-8 h-8 text-ink inline ml-1" />
              </div>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-honey text-white font-semibold hover:bg-honey-dark transition-all hover:shadow-lg hover:shadow-honey/30 hover:-translate-y-0.5"
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
                  <div
                    className="h-full bg-honey rounded-full transition-all duration-500"
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
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                      selected === i
                        ? 'border-honey bg-honey-soft text-ink'
                        : 'border-base-muted bg-base-bg text-ink-soft hover:border-ink/30'
                    }`}
                  >
                    <span className="font-medium">{option.text}</span>
                    {selected === i && (
                      <Check className="w-5 h-5 text-honey flex-shrink-0 ml-2" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ink text-white font-semibold hover:bg-ink-soft transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {currentQ + 1 < totalQuestions ? t.quiz.next : t.quiz.resultTitle}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {finished && (
            <div className="p-8 lg:p-12 text-center animate-scale-in">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  result === 'dog' ? 'bg-honey-soft' : 'bg-base-muted'
                }`}
              >
                {result === 'dog' ? (
                  <Dog className="w-12 h-12 text-honey" />
                ) : (
                  <Cat className="w-12 h-12 text-ink" />
                )}
              </div>
              <h3 className="font-display font-bold text-3xl text-ink mb-3">
                {result === 'dog' ? t.quiz.resultDog : t.quiz.resultCat}
              </h3>
              <p className="text-ink-light leading-relaxed max-w-lg mx-auto mb-8">
                {result === 'dog' ? t.quiz.resultDogDesc : t.quiz.resultCatDesc}
              </p>

              <div className="rounded-2xl bg-base-bg p-6 mb-8 text-left">
                <h4 className="font-display font-semibold text-ink mb-4 text-center">
                  {t.quiz.recommendedBreeds}
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {(result === 'dog' ? recommendedDogBreeds : recommendedCatBreeds).map((breed, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-base-surface border border-honey/30 text-ink font-medium text-sm"
                    >
                      {breed}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-base-bg border border-base-muted text-ink font-semibold hover:border-honey hover:text-honey transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                {t.quiz.restart}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
