import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    if (matches.length === 0) {
      matches = BREEDS_DATABASE;
    }
    return matches.slice(0, 4);
  };

  const recommended = getRecommendedBreeds();

  return (
    // Обертка в bg-base-bg для консистентности
    <div className="min-h-screen bg-base-bg py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-surface rounded-3xl shadow-xl border border-base-muted p-6 md:p-8 animate-fade-in">
          
          {/* Header теста */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-accent-soft rounded-xl text-accent shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink font-display">Психологический тест совместимости</h1>
              <p className="text-ink-light text-sm">Анализируем ваш психотип и образ жизни для подбора идеальной породы</p>
            </div>
          </div>

          {!showResult ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-ink-light mb-2 uppercase tracking-wider">
                  <span>Вопрос {currentQuestion + 1} из {QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full bg-base-muted h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-accent h-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Box */}
              <div className="flex items-start gap-3 mb-8 bg-base-bg p-5 rounded-2xl border border-base-muted">
                <div className="p-2.5 bg-base-surface rounded-lg shadow-sm text-brand">
                  {QUESTIONS[currentQuestion].icon}
                </div>
                <h2 className="text-xl font-bold text-ink leading-tight pt-1">
                  {QUESTIONS[currentQuestion].text}
                </h2>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {QUESTIONS[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.effects)}
                    className="w-full text-left p-4 rounded-xl border border-base-muted hover:border-accent hover:bg-accent-soft/30 text-ink-soft font-medium transition-all duration-150 active:scale-[0.99] shadow-sm hover:shadow-md"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-4 animate-scale-in">
              <div className="text-center mb-10">
                <div className="inline-flex p-4 bg-accent-soft rounded-full text-accent mb-4 shadow-sm">
                  <Heart className="w-10 h-10 fill-current" />
                </div>
                <h2 className="text-3xl font-black text-ink font-display mb-2">Ваша психологическая совместимость</h2>
                <p className="text-ink-light mt-1 max-w-md mx-auto leading-relaxed">
                  Эти породы обладают поведенческими паттернами, которые идеально дополнят вашу повседневность.
                </p>
              </div>

              {recommended.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {recommended.map(breed => (
                    <div key={breed.id} className="relative group border border-base-muted rounded-2xl overflow-hidden shadow-sm bg-base-surface hover:shadow-xl transition-all duration-300 flex flex-col">
                      
                      {/* Размытый фон для глубины */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center scale-150 blur-2xl opacity-20 pointer-events-none z-0"
                        style={{ backgroundImage: `url(${breed.image})` }}
                      />
                      
                      <div className="relative z-10 p-5 flex flex-col h-full">
                        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl shadow-md bg-base-bg">
                          <img 
                            src={breed.image} 
                            alt={breed.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <h3 className="text-xl font-bold text-ink mb-2 font-display">{breed.name}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-2 py-1 bg-brand-soft/20 text-brand text-[10px] font-bold rounded-md uppercase tracking-wider border border-brand/10">
                            {breed.temperament === 'active' ? 'Активный' : breed.temperament === 'calm' ? 'Спокойный' : breed.temperament === 'independent' ? 'Независимый' : 'Дружелюбный'}
                          </span>
                          <span className="px-2 py-1 bg-base-bg text-ink-soft text-[10px] font-bold rounded-md uppercase tracking-wider border border-base-muted">
                            {breed.size === 'small' ? 'Маленький' : breed.size === 'medium' ? 'Средний' : 'Крупный'}
                          </span>
                        </div>

                        <p className="text-ink-soft text-sm mb-4 line-clamp-3 leading-relaxed font-normal">
                          {breed.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-base-muted text-xs text-ink-light flex flex-col gap-1">
                          <span className="flex items-center gap-1">📍 {breed.origin}</span>
                          <span className="flex items-center gap-1">⏳ {breed.lifeSpan} | ⚖️ {breed.weight}</span>
                        </div>
                        
                        <Link 
                          to={`/wiki/${breed.id}`} 
                          className="mt-4 w-full py-3 bg-accent text-brand rounded-xl text-sm font-bold hover:bg-accent-light transition-all shadow-md hover:shadow-lg text-center block"
                        >
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-base-bg rounded-2xl border-2 border-dashed border-base-muted">
                  <p className="text-ink-soft">
                    Для вашего редкого сочетания качеств мы рекомендуем заглянуть в общий каталог.
                  </p>
                </div>
              )}

              <button 
                onClick={restartQuiz}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-brand text-brand font-bold hover:bg-brand hover:text-white transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5" />
                Пройти заново
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
