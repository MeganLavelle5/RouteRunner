export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { text } = req.query;
  if (!text) return res.status(400).json({ error: 'Missing text parameter' });

  const response = await fetch(
    `https://api.openrouteservice.org/geocode/search?text=${encodeURIComponent(text)}&size=1`,
    { headers: { 'Authorization': process.env.ORS_API_KEY.trim() } }
  );
  const data = await response.json();
  console.log('ORS geocode status:', response.status, JSON.stringify(data));
  res.status(response.status).json(data);
}
