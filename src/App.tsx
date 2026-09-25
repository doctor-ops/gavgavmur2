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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-bg flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Home />
                </>
              }
            />
            <Route path="/tools/importozameshenie" element={<ImportSubstitution />} />
            <Route path="/tools/allergens" element={<AllergenScanner />} />
            <Route path="/tools/calories" element={<CalorieCalculator />} />
            <Route path="/tools/budget" element={<BudgetCalculator />} />
            <Route path="/wiki" element={<BreedCatalog />} />
            <Route path="/wiki/:id" element={<BreedDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
