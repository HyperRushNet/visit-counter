// api/index.js - Add 1 user to Google DB
export default async function handler(req, res) {
  try {
    // Bouw query parameters met browser info
    const params = new URLSearchParams();

    // Check of de request headers bestaan (server-side fetch)
    const headers = req.headers || {};

    // Standaard User-Agent (vercel-fetch) als niet beschikbaar
    const ua = headers['user-agent'] || 'vercel-fetch';
    params.set('ua', ua);

    // Optioneel: voeg extra server-side info toe
    params.set('platform', headers['sec-ch-ua-platform'] || '');
    params.set('language', headers['accept-language'] || '');
    params.set('mod', '1'); // voorkomt dubbele telling bij server-side fetch

    // Nieuwe Google Script URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwuy_NVBf55hKcgaCMJLGrFzMTF1iVztkWH5l-_7MqN40LnkABHJZYERldxUs2Mswuv/exec';
    const url = `${scriptUrl}?${params.toString()}`;

    // Fetch naar Google Script
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Script returned status ${response.status}`);
    }

    res.status(200).end();
  } catch (error) {
    console.error('Error fetching Google Script:', error);
    res.status(500).end();
  }
}
