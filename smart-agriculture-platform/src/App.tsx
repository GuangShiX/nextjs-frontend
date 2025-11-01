import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FieldDetail from './pages/FieldDetail';
import About from './pages/About';

function App() {
  console.log('App component is rendering');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/field/:id" element={<FieldDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
