export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({ error: 'Missing LINE token' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { name, phone, date, guests, selectedPackage } = body || {};

    if (!name || !phone || !date || !guests) {
      return res.status(400).json({ error: 'Missing booking fields' });
    }

    const message =
      'New Baan APA Booking\n\n' +
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Date: ' + date + '\n' +
      'Guests: ' + guests + '\n' +
      'Package: ' + (selectedPackage || 'Not selected');

    const lineResponse = await fetch(
      'https://api.line.me/v2/bot/message/broadcast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.trim(),
        },
        body: JSON.stringify({
          messages: [
            {
              type: 'text',
              text: message,
            },
          ],
        }),
      }
    );

    const lineText = await lineResponse.text();

    if (!lineResponse.ok) {
      console.error('LINE ERROR:', lineText);
      return res.status(500).json({
        error: 'LINE API failed',
        detail: lineText,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SERVER ERROR:', err);
    return res.status(500).json({
      error: 'Server crashed',
      detail: err.message,
    });
  }
}