// /api/index.js
export default async function handler(req, res) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzVpymE_nsWEDkI65Rf287YxLU2g0j_xXHV3tTjWlc2qPcmylR3qxBct5MaauHUeUGy/exec";

  // Zet CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // alle origins toegestaan
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');

  // OPTIONS request voor preflight afhandelen
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await fetch(`${scriptUrl}?ua=vercel-fetch`, {
      headers: {
        'User-Agent': 'vercel-fetch'
      }
    });
    res.status(200).json({ message: 'Teller verhoogd!' });
  } catch (error) {
    console.error('Google Script fetch error:', error);
    res.status(500).json({ error: 'Kan Google Script niet bereiken' });
  }
}
