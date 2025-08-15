export default async function handler(req, res) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzVpymE_nsWEDkI65Rf287YxLU2g0j_xXHV3tTjWlc2qPcmylR3qxBct5MaauHUeUGy/exec";

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // **Snel antwoord geven**
  res.status(200).json({ message: '+1 scheduled - Counter' });

  // **Asynchrone achtergrond-fetch**
  setTimeout(async () => {
    try {
      // tijdelijke cache-variabele in memory
      global._pendingFetch = global._pendingFetch || false;

      if (!global._pendingFetch) {
        global._pendingFetch = true;

        await fetch(`${scriptUrl}?ua=vercel-fetch`, {
          headers: {
            'User-Agent': 'vercel-fetch'
          }
        });

        global._pendingFetch = false;
      }
    } catch (error) {
      console.error('Background Google Script fetch error:', error);
      global._pendingFetch = false;
    }
  }, 0); // direct na response starten
}
