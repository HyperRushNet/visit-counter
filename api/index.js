// api/index.js
import https from 'https';

const scriptUrl = 'https://script.google.com/macros/s/AKfycbzVpymE_nsWEDkI65Rf287YxLU2g0j_xXHV3tTjWlc2qPcmylR3qxBct5MaauHUeUGy/exec';

export default function handler(req, res) {
  // 1️⃣ Direct antwoord geven
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  res.status(200).json({ message: '+1 scheduled - Counter' });

  // 2️⃣ Fire-and-forget background fetch
  (async () => {
    try {
      global._pendingFetch = global._pendingFetch || false;
      if (global._pendingFetch) return; // voorkomen dubbele fetch
      global._pendingFetch = true;

      // korte retry-optie + keep-alive
      const agent = new https.Agent({ keepAlive: true });

      const attempt = async (retries = 2) => {
        try {
          await fetch(`${scriptUrl}?ua=vercel-fetch`, { headers: { 'User-Agent': 'vercel-fetch' }, agent });
          console.log('Background fetch succeeded');
        } catch (err) {
          console.error('Background fetch failed:', err);
          if (retries > 0) {
            setTimeout(() => attempt(retries - 1), 100); // kleine retry
          }
        }
      };

      attempt(); // start eerste fetch
    } catch (e) {
      console.error('Unexpected background error:', e);
    } finally {
      global._pendingFetch = false;
    }
  })();
}
