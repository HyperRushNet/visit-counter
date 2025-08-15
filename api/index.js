export default async function handler(req, res) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzVpymE_nsWEDkI65Rf287YxLU2g0j_xXHV3tTjWlc2qPcmylR3qxBct5MaauHUeUGy/exec";

  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await fetch(`${scriptUrl}?ua=vercel-fetch`, {
      headers: {
        'User-Agent': 'vercel-fetch'
      }
    });
    res.status(200).json({ message: '+1 - Counter' });
  } catch (error) {
    console.error('Google Script fetch error:', error);
    res.status(500).json({ error: 'Cannot reach Google Script.' });
  }
}
