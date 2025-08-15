// api/index.js
export default function handler(req, res) {
  try {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzTbq9stvMKpOHbCFB-xafgF9B7Jrn0pEs8Kt-gn3_wxjkAgvo3R0SoMDW1cdnXoYdV/exec';
    
    const params = new URLSearchParams();
    params.set('mod', '0'); // telt mee
    params.set('ua', 'vercel-browser/1.0 Mozilla/5.0'); // spoof User-Agent

    const url = `${scriptUrl}?${params.toString()}`;

    // Fire-and-forget fetch
    fetch(url).catch(err => console.error('Google Script fetch error:', err));

    // Direct terug naar client, ongeacht of Google Script al klaar is
    res.status(200).json({ success: true, message: 'Fetch gestart, telt mee!' });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
