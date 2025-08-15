// /api/index.js
export default async function handler(req, res) {
  try {
    // Haal User-Agent van de binnenkomende request
    const userAgent = req.headers['user-agent'] || '';
    
    // Nieuwe Google Script URL + ua query parameter
    const scriptUrl = `https://script.google.com/macros/s/AKfycbySCvUBYsF9mcU50auxpuV8S7n_VmDDXA2KY39ZVjEW4KhidVUZrHaI-OUkfEhAEmk/exec?ua=${encodeURIComponent(userAgent)}`;
    
    // Fetch naar Google Script
    const response = await fetch(scriptUrl);
    const data = await response.json();

    // Stuur JSON terug
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Google Script:', error);
    res.status(500).json({ error: 'Failed to fetch Google Script' });
  }
}
