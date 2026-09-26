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
                <div className="p-10 text-center">
                  <Hero />
                  {/* ПРОБУЕМ ВКЛЮЧИТЬ HOME */}
                  <Home />
                  <h1 className="text-3xl font-bold text-ink mt-10">ГЛАВНАЯ СТРАНИЦА</h1>
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
