// api/index.js
// In-memory queue (blijft per serverless instance alive zolang runtime bestaat)
global.googleScriptQueue = global.googleScriptQueue || [];

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTbq9stvMKpOHbCFB-xafgF9B7Jrn0pEs8Kt-gn3_wxjkAgvo3R0SoMDW1cdnXoYdV/exec';

async function processQueue() {
  while (global.googleScriptQueue.length > 0) {
    const item = global.googleScriptQueue.shift();
    try {
      await fetch(item.url);
      console.log('Google Script fetch success');
    } catch (err) {
      console.error('Google Script fetch failed, retrying...', err);
      // terug in de queue voor retry
      global.googleScriptQueue.push(item);
      // korte delay voordat retry
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

export default function handler(req, res) {
  try {
    const params = new URLSearchParams();
    params.set('mod', '0'); // telt mee
    params.set('ua', 'vercel-browser/1.0 Mozilla/5.0'); // spoof User-Agent

    const url = `${SCRIPT_URL}?${params.toString()}`;

    // Voeg toe aan in-memory queue
    global.googleScriptQueue.push({ url });

    // Start async queue processing, maar blokkeer client niet
    processQueue().catch(err => console.error('Queue processor error:', err));

    // Direct terug naar client
    res.status(200).json({ success: true, message: 'Fetch gestart en queue toegevoegd!' });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
