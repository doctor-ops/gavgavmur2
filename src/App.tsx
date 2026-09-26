import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header }, { Footer } from '@/components/Header'; // проверьте импорты
import { Hero } from '@/components/Hero';
import { Home } from '@/pages/Home';
// ... остальные импорты

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
                  <h1 className="text-3xl font-bold">ГЛАВНАЯ СТРАНИЦА</h1>
                  {/* Сначала закомментируем Hero и Home, чтобы проверить Header/Footer */}
                  {/* <Hero /> */}
                  {/* <Home /> */}
                </div>
              }
            />
            {/* остальные маршруты */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
