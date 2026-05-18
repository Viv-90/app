import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%'
      }}
    >
      <div className="container navbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img 
            src={logo} 
            alt="WOW Logo" 
            style={{ 
              height: '36px', 
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>
            WOW.
          </div>
        </div>
        
        <nav className="nav-links">
          <a href="#engine">Wow Engine</a>
          <a href="#stellar">Stellar Network</a>
          <a href="#anchors">Anchors</a>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn btn-outline desktop-only" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>Sign In</button>
          <button className="btn btn-primary desktop-only" style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem' }}>Get App</button>
          
          {/* Mobile menu trigger */}
          <button 
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '0.5rem',
              color: 'var(--primary-color)' 
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'var(--white)',
              borderBottom: '1px solid var(--glass-border)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <a href="#engine" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>Wow Engine</a>
              <a href="#stellar" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>Stellar Network</a>
              <a href="#anchors" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>Anchors</a>
              <hr style={{ borderColor: 'rgba(51, 51, 160, 0.1)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn btn-outline" style={{ width: '100%' }}>Sign In</button>
                <button className="btn btn-primary" style={{ width: '100%' }}>Get App</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
