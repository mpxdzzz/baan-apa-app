export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, date, guests, selectedPackage } = req.body;

    if (!name || !phone || !date || !guests) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const message = `
📩 New Baan APA Booking

👤 Name: ${name}
📞 Phone: ${phone}
📅 Date: ${date}
👥 Guests: ${guests}
📦 Package: ${selectedPackage}
`;

    const response = await fetch('https://api.line.me/v2/bot/message/broadcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer fRuo2DIQubnyGvWI7zJmy1HydMXEjVi1ohIN8+XoTvMiW7rt3RjwTdEuxАЗеj82hС0е3/WZ2UsVej71pQWvSzrF8VEQ6AtbRwcuejafm5oRKKn1mkXHdVIGMD4M3zrXRiUMy9WVCayuxaA0bRKbJEwdB04t89/10/w1cDnyi|FU=',
      },
      body: JSON.stringify({
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('LINE ERROR:', errorText);
      return res.status(500).json({ error: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log('SERVER ERROR:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}