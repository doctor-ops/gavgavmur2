import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, ShieldCheck, Clock, User, Home } from 'lucide-react';
import { BREEDS_DATABASE, Breed } from '../data/breeds';

interface Question {
  id: number;
  text: string;
  icon: React.ReactNode;
  options: {
    text: string;
    effects: {
      temp: { active?: number; calm?: number; independent?: number; friendly?: number };
      size: { small?: number; medium?: number; large?: number };
    };
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Каков ваш личный уровень повседневной активности и ритм жизни?",
    icon: <User className="w-5 h-5" />,
    options: [
      { text: "Высокий: спорт, пробежки, постоянное движение, долгие прогулки на воздухе", effects: { temp: { active: 4, friendly: 2 }, size: { medium: 2, large: 3 } } },
      { text: "Умеренный: стабильная работа, прогулки по вечерам, спокойный отдых в выходные", effects: { temp: { friendly: 3, calm: 2 }, size: { small: 2, medium: 3 } } },
      { text: "Домашний: много времени провожу за компьютером, книгами, ценю тишину и покой", effects: { temp: { calm: 4, independent: 3 }, size: { small: 3, medium: 1 } } }
    ]
  },
  {
    id: 2,
    text: "Психологический аспект: как вы справляетесь с необходимостью жесткого контроля и рутины?",
    icon: <Clock className="w-5 h-5" />,
    options: [
      { text: "Я дисциплинирован, легко подстраиваюсь под график и готов к ежедневным обязанностям", effects: { temp: { active: 3, friendly: 3 }, size: { large: 3, medium: 2 } } },
      { text: "Предпочитаю гибкость: если мне не захочется что-то делать, это не должно стать катастрофой", effects: { temp: { independent: 4, calm: 2 }, size: { small: 3 } } }
    ]
  },
  {
    id: 3,
    text: "Какая психологическая атмосфера дома для вас наиболее комфортна?",
    icon: <Home className="w-5 h-5" />,
    options: [
      { text: "Шумная, веселая, с постоянным тактильным контактом и бурным проявлением эмоций", effects: { temp: { friendly: 4, active: 2 }, size: { large: 2, medium: 2 } } },
      { text: "Спокойная, умиротворенная, где у каждого есть свое личное пространство", effects: { temp: { independent: 3, calm: 4 }, size: { small: 3, medium: 1 } } }
    ]
  },
  {
    id: 4,
    text: "Ваша реакция на непредвиденный стресс или нарушение личных границ (шум, испорченные вещи)?",
    icon: <ShieldCheck className="w-5 h-5" />,
    options: [
      { text: "Отреагирую спокойно, это решаемо процессом мягкого воспитания и дрессировки", effects: { temp: { active: 3, friendly: 2 }, size: { large: 3, medium: 2 } } },
      { text: "Это вызовет у меня сильный стресс, мне важен идеальный порядок и предсказуемость", effects: { temp: { calm: 4, independent: 2 }, size: { small: 4 } } }
    ]
  },
  {
    id: 5,
    text: "Сколько чистого времени (без учета работы и сна) вы готовы отдавать исключительно питомцу?",
    icon: <Clock className="w-5 h-5" />,
    options: [
      { text: "Более 3 часов в день — полноценное вовлечение, игры, занятия", effects: { temp: { active: 4, friendly: 3 }, size: { large: 3, medium: 2 } } },
      { text: "От 1 до 2 часов в день — базовый уход, прогулка и ласка после работы", effects: { temp: { friendly: 2, calm: 3 }, size: { medium: 3, small: 2 } } },
      { text: "Меньше часа — питомец должен уметь развлекать себя сам и не навязываться", effects: { temp: { independent: 5, calm: 2 }, size: { small: 4 } } }
    ]
  },
  {
    id: 6,
    text: "Опишите ваши жилищные условия и пространство для маневра:",
    icon: <Home className="w-5 h-5" />,
    options: [
      { text: "Большой частный дом или просторная квартира с доступом к паркам", effects: { temp: { active: 2 }, size: { large: 4, medium: 3 } } },
      { text: "Небольшая городская квартира, пространство ограничено", effects: { temp: { calm: 3, independent: 2 }, size: { small: 5, medium: 1 } } }
    ]
  }
];

export function PetQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const [tempScores, setTempScores] = useState({ active: 0, calm: 0, independent: 0, friendly: 0 });
  const [sizeScores, setSizeScores] = useState({ small: 0, medium: 0, large: 0 });

  const handleAnswer = (effects: typeof QUESTIONS[0]['options'][0]['effects']) => {
    setTempScores(prev => ({
      active: prev.active + (effects.temp.active || 0),
      calm: prev.calm + (effects.temp.calm || 0),
      independent: prev.independent + (effects.temp.independent || 0),
      friendly: prev.friendly + (effects.temp.friendly || 0),
    }));

    setSizeScores(prev => ({
      small: prev.small + (effects.size.small || 0),
      medium: prev.medium + (effects.size.medium || 0),
      large: prev.large + (effects.size.large || 0),
    }));

    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setTempScores({ active: 0, calm: 0, independent: 0, friendly: 0 });
    setSizeScores({ small: 0, medium: 0, large: 0 });
    setShowResult(false);
  };

  const getRecommendedBreeds = (): Breed[] => {
    const targetTemp = (Object.keys(tempScores) as Array<keyof typeof tempScores>).reduce((a, b) => 
      tempScores[a] > tempScores[b] ? a : b
    );

    const targetSize = (Object.keys(sizeScores) as Array<keyof typeof sizeScores>).reduce((a, b) => 
      sizeScores[a] > sizeScores[b] ? a : b
    );

    let matches = BREEDS_DATABASE.filter(b => b.temperament === targetTemp && b.size === targetSize);

    if (matches.length === 0) {
      matches = BREEDS_DATABASE.filter(b => b.temperament === targetTemp);
    }

    return matches.slice(0, 4);
  };

  const recommended = getRecommendedBreeds();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Психологический тест совместимости</h1>
            <p className="text-gray-500 text-sm">Анализируем ваш психотип и образ жизни для подбора идеальной породы</p>
          </div>
        </div>

        {!showResult ? (
          <div>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Вопрос {currentQuestion + 1} из {QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mb-6 bg-slate-50 p-4 rounded-xl border border-gray-100">
              <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600">
                {QUESTIONS[currentQuestion].icon}
              </div>
              <h2 className="text-xl font-bold text-gray-800 pt-1">
                {QUESTIONS[currentQuestion].text}
              </h2>
            </div>

            <div className="grid gap-3">
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.effects)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-700 font-medium transition-all duration-150 active:scale-[0.99] shadow-sm hover:shadow"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-green-50 rounded-full text-green-600 mb-3">
                <Heart className="w-10 h-10 fill-current" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Ваша психологическая совместимость</h2>
              <p className="text-gray-500 mt-1 max-w-md mx-auto">
                Эти породы обладают поведенческими паттернами, которые идеально дополнят вашу повседневность.
              </p>
            </div>

            {recommended.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {recommended.map(breed => (
                  <div key={breed.id} className="relative border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all flex flex-col">
                    
                    {/* Размытый фон */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-20 pointer-events-none"
                      style={{ backgroundImage: `url(${breed.image})` }}
                    />
                    
                    <div className="relative z-10 p-5 flex flex-col h-full">
                      <img 
                        src={breed.image} 
                        alt={breed.name} 
                        className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
                      />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{breed.name}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md uppercase">
                          {breed.temperament === 'active' ? 'Активный' : breed.temperament === 'calm' ? 'Спокойный' : breed.temperament === 'independent' ? 'Независимый' : 'Дружелюбный'}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md uppercase">
                          {breed.size === 'small' ? 'Маленький' : breed.size === 'medium' ? 'Средний' : 'Крупный'}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {breed.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50 text-xs text-gray-400 flex flex-col gap-1">
                        <span>📍 Родина: {breed.origin}</span>
                        <span>⏳ Жизнь: {breed.lifeSpan} | Вес: {breed.weight}</span>
                      </div>
                      
                      <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">
                  Для вашего редкого сочетания качеств мы рекомендуем заглянуть в общий каталог.
                </p>
              </div>
            )}

            <button 
              onClick={restartQuiz}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              Пройти заново
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
