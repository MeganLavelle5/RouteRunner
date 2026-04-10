export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { text } = req.query;
  if (!text) return res.status(400).json({ error: 'Missing text parameter' });

  try {
    const apiKey = (process.env.ORS_API_KEY || '').trim();
    console.log('ORS key present:', !!apiKey, 'length:', apiKey.length);

    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?text=${encodeURIComponent(text)}&size=1`,
      { headers: { 'Authorization': apiKey } }
    );

    const raw = await response.text();
    console.log('ORS geocode status:', response.status, 'body:', raw.slice(0, 300));

    let data;
    try { data = JSON.parse(raw); }
    catch { return res.status(502).json({ error: 'ORS returned non-JSON', raw: raw.slice(0, 200) }); }

    res.status(response.status).json(data);
  } catch (err) {
    console.error('Geocode handler error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
