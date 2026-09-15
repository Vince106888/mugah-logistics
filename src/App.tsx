import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { ModeProvider } from './contexts/ModeContext';
import { DealsProvider } from './contexts/DealsContext';
import { Home } from './pages/Home';
import { Inventory } from './pages/Inventory';
import { VehicleDetail } from './pages/VehicleDetail';
import { Hire } from './pages/Hire';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Deals } from './pages/Deals';
import { DealDetail } from './pages/DealDetail';
import { Checkout } from './pages/Checkout';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';
import { Pay } from './pages/Pay';
import { Payments } from './pages/Payments';
import { PageMeta } from './components/PageMeta';
import { siteConfig } from './config';
import { useMode } from './contexts/ModeContext';

function RouteEffects() {
  const { pathname } = useLocation();
  const { setMode } = useMode();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (pathname === '/hire') setMode('hire');
    if (pathname === '/inventory') setMode('buy');
  }, [pathname, setMode]);
  return null;
}

interface AppProps {
  /** Which side of the business the visitor lands on. */
  initialMode?: 'buy' | 'hire';
}

export function App({ initialMode = 'buy' }: AppProps) {
  return (
    <ModeProvider initialMode={initialMode}>
      <DealsProvider>
        <BrowserRouter>
          <RouteEffects />
          <PageMeta />
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/vehicle/:slug" element={<VehicleDetail />} />
              <Route path="/hire" element={<Hire />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/pay" element={<Pay />} />
              {siteConfig.demoFeaturesEnabled && <Route path="/deals" element={<Deals />} />}
              {siteConfig.demoFeaturesEnabled && <Route path="/deals/:id" element={<DealDetail />} />}
              <Route path="*" element={<NotFound />} />
            </Route>
            {siteConfig.demoFeaturesEnabled && <Route path="/checkout/:token" element={<Checkout />} />}
          </Routes>
        </BrowserRouter>
      </DealsProvider>
    </ModeProvider>);

}
