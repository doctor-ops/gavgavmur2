import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Home } from '@/pages/Home';

const ImportSubstitution = lazy(() =>
  import('@/pages/ImportSubstitution').then((m) => ({ default: m.ImportSubstitution }))
);
const AllergenScanner = lazy(() =>
  import('@/pages/AllergenScanner').then((m) => ({ default: m.AllergenScanner }))
);
const CalorieCalculator = lazy(() =>
  import('@/pages/CalorieCalculator').then((m) => ({ default: m.CalorieCalculator }))
);
const BudgetCalculator = lazy(() =>
  import('@/pages/BudgetCalculator').then((m) => ({ default: m.BudgetCalculator }))
);
const BreedCatalog = lazy(() =>
  import('@/pages/BreedCatalog').then((m) => ({ default: m.BreedCatalog }))
);
const BreedDetail = lazy(() =>
  import('@/pages/BreedDetail').then((m) => ({ default: m.BreedDetail }))
);
const PetQuiz = lazy(() => import('@/pages/PetQuiz').then((m) => ({ default: m.PetQuiz })));
const PetGadgets = lazy(() =>
  import('@/pages/PetGadgets').then((m) => ({ default: m.PetGadgets }))
);

function PageFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-sm font-medium text-ink-soft">
      Загрузка…
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/gavgavmur2">
      <div className="min-h-screen bg-base-bg flex flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="animate-fade-in">
                    <Hero />
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
