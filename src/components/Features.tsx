import { motion } from 'framer-motion';
import { Repeat2, Anchor, Code2, ShieldCheck } from 'lucide-react';

const Features = () => {
  return (
    <section style={{ padding: '8rem 0', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            The Ultimate Conversion System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ color: 'var(--text-gray)', maxWidth: '750px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}
          >
            Powering applications with sub-second, cross-chain financial pipelines. The Wow Engine handles complex interoperability in the background, offering developers simple primitives to build next-generation fintech solutions.
          </motion.p>
        </div>

        {/* Row 1: 60 / 40 Disproportional Layout */}
        <div className="features-row">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="feature-card w-60"
          >
            <div>
              <div style={{
                marginBottom: '2rem',
                background: 'var(--gradient-balance)',
                width: '56px',
                height: '56px',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(51, 51, 160, 0.2)'
              }}>
                <Code2 size={28} color="var(--white)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                Developer-First Integration
              </h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                Integrate robust cross-chain conversions into your platform with just a few lines of code. Our simple REST APIs and lightweight SDKs abstract all the complex blockchain interactions, allowing you to focus purely on building your core user experience.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="feature-card w-40"
          >
            <div>
              <div style={{
                marginBottom: '2rem',
                background: 'var(--gradient-balance)',
                width: '56px',
                height: '56px',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(51, 51, 160, 0.2)'
              }}>
                <Repeat2 size={28} color="var(--white)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                Seamless Background Bridging
              </h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                The engine dynamically routes assets across major EVM networks and Solana, bridging them instantly to Stellar in the background without any friction for your end-users.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Row 2: 30 / 70 Disproportional Layout */}
        <div className="features-row">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="feature-card w-30"
          >
            <div>
              <div style={{
                marginBottom: '2rem',
                background: 'var(--gradient-balance)',
                width: '56px',
                height: '56px',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(51, 51, 160, 0.2)'
              }}>
                <Anchor size={28} color="var(--white)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                Anchor Middleware
              </h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                Automate your Stellar Anchor integrations. Resolve SEPs and directory queries cleanly in one unified layer.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="feature-card w-70"
          >
            <div>
              <div style={{
                marginBottom: '2rem',
                background: 'var(--gradient-balance)',
                width: '56px',
                height: '56px',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(51, 51, 160, 0.2)'
              }}>
                <ShieldCheck size={28} color="var(--white)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                High-Throughput Financial Backbone
              </h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                Built to handle large-scale, high-concurrency enterprise transaction demands. It securely operates the foundational backend conversion layers for leading products (including the WOW app directly), assuring compliance, multi-sig authorization and absolute reliability.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Features;
