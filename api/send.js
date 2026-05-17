export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subject, body } = req.body;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer re_61kZkU2b_FAce3tvK4q12czpwGvBTHW9q`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'hey.elaguilar@gmail.com',
      subject: subject,
      html: `<p>${body}</p>`,
    }),
  });

  if (response.ok) {
    res.status(200).json({ message: 'Message sent successfully!' });
  } else {
    const error = await response.json();
    res.status(500).json({ message: `Error: ${JSON.stringify(error)}` });
  }
}
