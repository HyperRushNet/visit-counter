// api/index.js
export default async function handler(req, res) {
  try {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzTbq9stvMKpOHbCFB-xafgF9B7Jrn0pEs8Kt-gn3_wxjkAgvo3R0SoMDW1cdnXoYdV/exec';
    
    const params = new URLSearchParams();
    // Mod != 1 zodat het telt
    params.set('mod', '0');
    // Spoof browser User-Agent zodat Google Script het telt
    params.set('ua', 'vercel-browser/1.0 Mozilla/5.0');

    const url = `${scriptUrl}?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Google Script returned ${response.status}`);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error fetching Google Script:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
