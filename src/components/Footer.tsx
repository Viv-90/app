const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--white)', padding: '4rem 0 2rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>

          <div style={{ maxWidth: '300px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '1rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}>
              Whales of Wallstreet.
            </div>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Our mission is to make cross-chain liquidity and conversion accessible and transparent for everyone, powered by the Wow Engine.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Products</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-gray)', fontSize: '0.875rem' }}>
                <li><a href="#">Wow App</a></li>
                <li><a href="#">Wow Engine</a></li>
                <li><a href="#">Bridge</a></li>
                <li><a href="#">Anchors</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Company</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-gray)', fontSize: '0.875rem' }}>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Legal</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-gray)', fontSize: '0.875rem' }}>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-gray)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} Whales of Wallstreet. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
