import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, CheckCircle2 } from 'lucide-react';
import { BREEDS_DATABASE, Breed } from '../data/breeds'; // Импортируем нашу новую базу

interface Question {
  id: number;
  text: string;
  type: 'animal-pref' | 'temp-pref' | 'size-pref';
  options: {
    text: string;
    value: string; // Значение для фильтрации (например: 'cat', 'active', 'small')
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Кого вы больше хотите видеть в роли питомца?",
    type: 'animal-pref',
    options: [
      { text: "Собаку — верного друга для прогулок", value: "dog" },
      { text: "Кошку — грациозного домашнего компаньона", value: "cat" }
    ]
  },
  {
    id: 2,
    text: "Какой стиль жизни вам ближе?",
    type: 'temp-pref',
    options: [
      { text: "Активный: спорт, походы, постоянное движение", value: "active" },
      { text: "Размеренный: прогулки в парке, игры дома", value: "friendly" },
      { text: "Спокойный: чтение книг, тишина и отдых на диване", value: "calm" },
      { text: "Уединенный: ценю независимость и личное пространство", value: "independent" }
    ]
  },
  {
    id: 3,
    text: "Какого размера питомец вам больше подойдет?",
    type: 'size-pref',
    options: [
      { text: "Маленький (до 10 кг) — легко брать с собой", value: "small" },
      { text: "Средний (10-25 кг) — золотая середина", value: "medium" },
      { text: "Крупный (более 25 кг) — большой и солидный", value: "large" }
    ]
  }
];

export function PetQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ animal: '', temperament: '', size: '' });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const qType = QUESTIONS[currentQuestion].type;
    
    setAnswers(prev => ({
      ...prev,
      animal: qType === 'animal-pref' ? value : prev.animal,
      temperament: qType === 'temp-pref' ? value : prev.temperament,
      size: qType === 'size-pref' ? value : prev.size,
    }));

    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({ animal: '', temperament: '', size: '' });
    setShowResult(false);
  };

  // 💥 Умный поиск идеальной породы по фильтрам ответов
  const getRecommendedBreeds = (): Breed[] => {
    // 1. Фильтруем строго по типу (кошка или собака)
    let filtered = BREEDS_DATABASE.filter(b => b.type === answers.animal);
    
    // 2. Ищем идеальное совпадение по темпераменту
    let exactMatch = filtered.filter(b => b.temperament === answers.temperament);
    
    // Если точных совпадений нет, возвращаем просто животных выбранного вида
    return exactMatch.length > 0 ? exactMatch : filtered;
  };

  const recommended = getRecommendedBreeds();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        
        {/* Заголовок */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Интеллектуальный подбор породы</h1>
            <p className="text-gray-500 text-sm">Найдем питомца, который идеально разделит ваш характер</p>
          </div>
        </div>

        {!showResult ? (
          <div>
            {/* Прогресс */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-6">{QUESTIONS[currentQuestion].text}</h2>

            <div className="grid gap-3">
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-700 font-medium transition-all active:scale-[0.99]"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* РЕЗУЛЬТАТЫ С ПОДБОРОМ ПОРОД */
          <div className="py-4">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-green-50 rounded-full text-green-600 mb-3">
                <Heart className="w-10 h-10 fill-current" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">Подходящие вам породы</h2>
              <p className="text-gray-500 mt-1">На основе вашего темперамента и условий жилья</p>
            </div>

            {/* Карточки подходящих пород */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {recommended.map(breed => (
                <div key={breed.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-slate-50 hover:shadow-md transition-all">
                  <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{breed.name}</h3>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                        {breed.temperament === 'active' ? 'Активный' : breed.temperament === 'calm' ? 'Спокойный' : 'Независимый'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{breed.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                Пройти заново
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
