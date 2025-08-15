export default function handler(req, res) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzVpymE_nsWEDkI65Rf287YxLU2g0j_xXHV3tTjWlc2qPcmylR3qxBct5MaauHUeUGy/exec";

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // **Direct response naar user**
  res.status(200).json({ message: '+1 scheduled - Counter' });

  // **Background fetch zonder await**
  (async () => {
    try {
      global._pendingFetch = global._pendingFetch || false;

      if (!global._pendingFetch) {
        global._pendingFetch = true;

        fetch(`${scriptUrl}?ua=vercel-fetch`, {
          headers: { 'User-Agent': 'vercel-fetch' }
        }).catch(err => console.error('Background fetch failed:', err))
          .finally(() => { global._pendingFetch = false; });
      }
    } catch (e) {
      console.error('Background fetch error:', e);
      global._pendingFetch = false;
    }
  })();
}
