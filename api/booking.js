export default async function handler(req, res) {
  // รับเฉพาะ POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, date, guests, selectedPackage } = req.body;

    // ตรวจข้อมูล
    if (!name || !phone || !date || !guests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ❗ สำคัญ: ไม่มี emoji
    const message =
      New Baan APA Booking\n\n +
      Name: ${name}\n +
      Phone: ${phone}\n +
      Date: ${date}\n +
      Guests: ${guests}\n +
      `Package: ${selectedPackage}`;

    // ยิงไป LINE (Broadcast)
    const lineResponse = await fetch(
      'https://api.line.me/v2/bot/message/broadcast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
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

    // ถ้า LINE error
    if (!lineResponse.ok) {
      const errorText = await lineResponse.text();
      console.error('LINE ERROR:', errorText);

      return res.status(500).json({
        error: 'LINE API failed',
        detail: errorText,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SERVER ERROR:', err);

    return res.status(500).json({
      error: 'Internal server error',
      detail: err.message,
    });
  }
}