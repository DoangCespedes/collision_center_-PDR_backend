const express = require('express');
const { sendThankYouEmail, sendNewUserEmail } = require('../helpers/emailService');

const router = express.Router();

// Ruta para enviar el código de verificación y el correo de agradecimiento
router.post('/send-code', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'The email is required.' });
  }

  // Enviar el correo con el código y mensaje de agradecimiento
  const emailSent = await sendThankYouEmail(email);
  
  if (emailSent) {
    res.status(200).json({ message: 'Email sent successfully.'});
  } else {
    res.status(500).json({ error: 'Error sending the email.' });
  }
});

// Ruta para enviar el nuevo usuario al correo
router.post('/send-user', async (req, res) => {
  const { usuario } = req.body;

  if (!usuario) {
    return res.status(400).json({ error: 'User data is required.' });
  }

  const emailSent = await sendNewUserEmail(usuario);

  if (emailSent) {
    return res.status(200).json({ success: true, message: 'User email sent successfully.' });
  } else {
    return res.status(400).json({ success: false, error: 'Invalid user data or failed to send email.' });
  }
});


module.exports = router;
