import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Home } from '@/pages/Home';
import { ImportSubstitution } from '@/pages/ImportSubstitution';
import { AllergenScanner } from '@/pages/AllergenScanner';
import { CalorieCalculator } from '@/pages/CalorieCalculator';
import { BudgetCalculator } from '@/pages/BudgetCalculator';
import { BreedCatalog } from '@/pages/BreedCatalog';
import { BreedDetail } from '@/pages/BreedDetail';
import { PetQuiz } from '@/pages/PetQuiz';
import { PetGadgets } from './pages/PetGadgets';

function App() {
  return (
    <BrowserRouter basename="/gavgavmur2">
      <div className="min-h-screen bg-base-bg flex flex-col">
        <Header /> 
        
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <div className="animate-fade-in">
                  <Hero />
                  
                  {/* Маркетинговый переход к сервисам */}
                  <div className="text-center max-w-3xl mx-auto px-4 py-16">
                    <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-ink mb-4">
                      Полезные статьи и обзоры кормов
                    </h2>
                    <p className="text-ink-soft text-base leading-relaxed">
                      Собрали для вас лучшие рекомендации экспертов и отзывы владельцев, чтобы ваш питомец получал только самое лучшее.
                    </p>
                  </div>

                  <Home />
                </div>
              }
            />
            <Route path="/tools/importozameshenie" element={<ImportSubstitution />} />
            <Route path="/tools/allergens" element={<AllergenScanner />} />
            <Route path="/tools/calories" element={<CalorieCalculator />} />
            <Route path="/tools/budget" element={<BudgetCalculator />} />
            <Route path="/wiki" element={<BreedCatalog />} />
            <Route path="/wiki/:id" element={<BreedDetail />} />
            <Route path="/tools/quiz" element={<PetQuiz />} />
            <Route path="/gadgets" element={<PetGadgets />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
