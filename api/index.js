// api/index.js - Add 1 user to Google DB
export default async function handler(req, res) {
  try {
    await fetch('https://script.google.com/macros/s/AKfycbytauXkBFmKXVxY514_y7raBTEKr32MxfyX7M1mNmtF9vuXfbDem08wVZYNcvriBhE4/exec');
    res.status(200).end();
  } catch (error) {
    console.error('Error fetching Google Script:', error);
    res.status(500).end();
  }
}
