// /api/index.js
export default async function handler(req, res) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzVpymE_nsWEDkI65Rf287YxLU2g0j_xXHV3tTjWlc2qPcmylR3qxBct5MaauHUeUGy/exec";

  try {
    // Stuur User-Agent mee zodat Google Script weet dat het een fetch is
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
