// api/index.js
export default async function handler(req, res) {
  try {
    const params = new URLSearchParams();
    // Server-side fetch telt niet
    params.set('mod', '1'); 
    params.set('ua', req.headers['user-agent'] || 'vercel-fetch');

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxe7nWBEA17dekNLSIv7LWC_psU5p2AiBLGE5TF9J4QUEZM708IaHBM7o65A_T0sGke/exec';
    const url = `${scriptUrl}?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Google Script returned ${response.status}`);

    res.status(200).end();
  } catch (error) {
    console.error('Error fetching Google Script:', error);
    res.status(500).end();
  }
}
