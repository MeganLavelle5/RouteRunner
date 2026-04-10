export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { startAddress, distanceMiles, terrain, elevGain, minutes } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 180,
      messages: [{
        role: 'user',
        content: `You are an enthusiastic running coach. Write 2-3 energetic sentences describing this running route to get a runner excited. Be specific and motivating. No intro phrases like "Here is" or "This route".

Route: ${distanceMiles} miles, ${terrain} terrain, starting near ${startAddress}
Elevation gain: ${elevGain} ft, Estimated time: ${minutes} min`
      }]
    })
  });

  const data = await response.json();
  if (!response.ok) return res.status(response.status).json({ error: 'Claude API error' });
  res.status(200).json({ description: data.content[0].text });
}
