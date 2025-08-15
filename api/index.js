// api/index.js - Add 1 user to Google DB
export default async function handler(req, res) {
  try {
    await fetch('https://script.google.com/macros/s/AKfycbyqVvgb43Xv_wNbUXZygfj-0wEa0ZV-k2h3ZyrWEzW2x3YWaABxJ9PwZ7-CmH1moKp0/exec');
    res.status(200).end();
  } catch (error) {
    console.error('Error fetching Google Script:', error);
    res.status(500).end();
  }
}
