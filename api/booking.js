export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 🔥 แก้ตรงนี้
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { name, phone, date, guests, selectedPackage } = body;

    if (!name || !phone || !date || !guests) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const message =
      New Baan APA Booking\n\n +
      Name: ${name}\n +
      Phone: ${phone}\n +
      Date: ${date}\n +
      Guests: ${guests}\n +
      `Package: ${selectedPackage}`;

    const lineResponse = await fetch(
      'https://api.line.me/v2/bot/message/broadcast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          messages: [{ type: 'text', text: message }],
        }),
      }
    );

    if (!lineResponse.ok) {
      const err = await lineResponse.text();
      console.error("LINE ERROR:", err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}