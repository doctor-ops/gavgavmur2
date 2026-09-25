import React, { useState } from 'react';
import { Shield, Sparkles, Home, Heart, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: { cat: number; dog: number; small: number; exotic: number };
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Сколько времени в день вы готовы уделять активным прогулкам и играм?",
    options: [
      { text: "Более 2 часов. Готов бегать и заниматься дрессировкой", points: { cat: 0, dog: 4, small: 0, exotic: 0 } },
      { text: "Около часа. Спокойная прогулка или активные игры дома", points: { cat: 2, dog: 2, small: 1, exotic: 0 } },
      { text: "До 30 минут. Предпочитаю ленивый отдых на диване", points: { cat: 4, dog: 0, small: 3, exotic: 1 } },
      { text: "Минимум времени. Главное — наблюдать, а не взаимодействовать", points: { cat: 1, dog: 0, small: 2, exotic: 4 } }
    ]
  },
  {
    id: 2,
    text: "Каковы жилищные условия для будущего питомца?",
    options: [
      { text: "Просторный загородный дом с огороженной территорией", points: { cat: 2, dog: 4, small: 1, exotic: 2 } },
      { text: "Обычная городская квартира", points: { cat: 4, dog: 2, small: 3, exotic: 2 } },
      { text: "Съемное жилье или небольшая комната", points: { cat: 3, dog: 1, small: 4, exotic: 3 } }
    ]
  },
  {
    id: 3,
    text: "Какое качество в питомце для вас самое важное?",
    options: [
      { text: "Преданность, защита и совместная активность", points: { cat: 0, dog: 4, small: 0, exotic: 0 } },
      { text: "Ласка, независимость и уютное мурлыканье", points: { cat: 4, dog: 0, small: 1, exotic: 0 } },
      { text: "Простота в уходе, тишина и компактность", points: { cat: 2, dog: 1, max: 4, exotic: 1 } },
      { text: "Необычный внешний вид и экзотичность", points: { cat: 0, dog: 0, small: 0, exotic: 4 } }
    ]
  },
  {
    id: 4,
    text: "Как вы относитесь к возможному шуму или беспорядку (шерсть, погрызенные вещи)?",
    options: [
      { text: "Пройду через это спокойно, всё отмою и воспитаю", points: { cat: 2, dog: 4, small: 1, exotic: 1 } },
      { text: "Шерсть переношу нормально, но порчу мебели не потерплю", points: { cat: 4, dog: 2, small: 2, exotic: 1 } },
      { text: "Хочу идеальную чистоту и тишину в доме", points: { cat: 0, dog: 0, small: 3, exotic: 4 } }
    ]
  }
];

const RESULTS = {
  dog: {
    title: "Верный Пёс 🐕",
    desc: "Вы полны энергии и готовы к ответственности! Вам идеально подойдет собака. Она станет преданным другом, разделит с вами утренние пробежки и долгие прогулки.",
    tips: "Обратите внимание на калькулятор бюджета, чтобы рассчитать затраты на корм и кинолога."
  },
  cat: {
    title: "Ласковый Кот 🐈",
    desc: "Вы цените домашний уют, личные границы и покой. Кошка станет идеальным компаньоном: она подарит вам тепло, но не будет требовать ежеминутного внимания и прогулок в дождь.",
    tips: "Воспользуйтесь нашим сканером аллергенов перед покупкой корма."
  },
  small: {
    title: "Маленький грызун или кролик 🐇",
    desc: "Вам подходят компактные и милые животные. Хомяк, морская свинка, шиншилла или декоративный кролик не займут много места, не шумят на весь дом и просты в уходе.",
    tips: "Убедитесь, что клетка будет достаточно просторной для выбранного малыша."
  },
  exotic: {
    title: "Экзотический питомец 🦎",
    desc: "Вы цените тишину, созерцание и необычную эстетику. Подумайте о рептилиях (ящерица, змея), улитках ахатинах или аквариумных рыбках. Они гипоаллергенны и не требуют выгула.",
    tips: "Для таких животных критически важно сразу настроить правильный микроклимат и свет."
  }
};

export function PetQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ cat: 0, dog: 0, small: 0, exotic: 0 });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: typeof scores) => {
    setScores(prev => ({
      cat: prev.cat + points.cat,
      dog: prev.dog + points.dog,
      small: prev.small + points.small,
      exotic: prev.exotic + points.exotic,
    }));

    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScores({ cat: 0, dog: 0, small: 0, exotic: 0 });
    setShowResult(false);
  };

  const getWinner = () => {
    const keys = Object.keys(scores) as (keyof typeof scores)[];
    return keys.reduce((a, b) => (scores[a] > scores[b] ? a : b));
  };

  const winnerKey = getWinner();
  const result = RESULTS[winnerKey];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        
        {/* Шапка теста */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light rounded-xl text-primary">
            <Sparkles className="w-6 'h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Подбор питомца</h1>
            <p className="text-gray-500 text-sm">Ответьте на вопросы, чтобы узнать, кто сделает вас счастливее</p>
          </div>
        </div>

        {!showResult ? (
          <div>
            {/* Прогресс-бар */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Вопрос {currentQuestion + 1} из {QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Текст вопроса */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {QUESTIONS[currentQuestion].text}
            </h2>

            {/* Варианты ответов */}
            <div className="space-y-3">
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.points)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-700 font-medium transition-all duration-200 active:scale-[0.99]"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Экран результатов */
          <div className="text-center py-4 animate-fade-in">
            <div className="inline-flex p-4 bg-green-50 rounded-full text-green-600 mb-4">
              <Heart className="w-12 h-12 fill-current" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Идеальный выбор: {result.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md mx-auto">
              {result.desc}
            </p>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-left mb-8 max-w-md mx-auto flex gap-3">
              <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-900"><strong className="font-semibold">Совет:</strong> {result.tips}</p>
            </div>

            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Пройти заново
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
