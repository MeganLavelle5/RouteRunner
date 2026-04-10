export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const response = await fetch(
    'https://api.openrouteservice.org/v2/directions/foot-walking/geojson',
    {
      method: 'POST',
      headers: {
        'Authorization': process.env.ORS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    }
  );
  const data = await response.json();
  res.status(response.status).json(data);
}
