const { Resend } = require("resend"); 
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY); 

const sendThankYouEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: '"Collision Center & PDR" <noreply@collisioncenterpdr.com>',
      to: [email],
      subject: 'Thank you for choosing us',
      html: `
        <p>Thank you for choosing us, your request is being processed. We will contact you in a few minutes.</p>
        <br/>
        <hr/>
        <p><strong>CALL US: <span style="color:blue;">+1.719.283.7020</span></strong></p>
        <p><strong>CALL US: <span style="color:blue;">+1.786.636.4189</span></strong></p>
        <br/>
        <p>Thank you,<br/><strong>Collision Center & PDR Team</strong></p>
      `,
    });

    if (error) {
      console.error('Error sending the email:', error);
      return false;
    }

    console.log('Email sent:', data.id);
    return true;
  } catch (err) {
    console.error('Unexpected error sending the email:', err.message);
    return false;
  }
};


const sendNewUserEmail = async (usuario) => {
  if (!usuario || typeof usuario !== 'object') {
    console.error('Invalid user data');
    return false;
  }

  try {
    const { nombre, telefono, correo, yearCar, makeCar, modelCar, vin_number, service, message, consent, claim_number, role, _id, payOutOfPocket } = usuario;

    const htmlContent = `
      <h2>New User Registration Details</h2>
      <ul>
        <li><strong>Name:</strong> ${nombre}</li>
        <li><strong>Phone Number:</strong> ${telefono}</li>
        <li><strong>Email:</strong> ${correo}</li>
        <li><strong>Vehicle:</strong> ${yearCar} ${makeCar} ${modelCar}</li>
        <li><strong>VIN Number:</strong> ${vin_number}</li>
        <li><strong>Service Requested:</strong> ${service}</li>
        <li><strong>Message:</strong> ${message}</li>
        <li><strong>Consent:</strong> ${consent ? 'Yes' : 'No'}</li>
        <li><strong>Claim Number:</strong> ${claim_number || 'N/A'}</li>
        <li><strong>Role:</strong> ${role}</li>
        <li><strong>User ID:</strong> ${_id}</li>
        <li><strong>Pay Out Of Pocket:</strong> ${payOutOfPocket ? 'Yes' : 'No'}</li>
      </ul>
    `;

    const { data, error } = await resend.emails.send({
      from: '"Collision center & PDR" <noreply@collisioncenterpdr.com>',
      to: 'doangcespedesloreto@gmail.com',
      subject: 'New User Registration',
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending the email:', error);
      return false;
    }

    console.log('Email sent:', data.id);
    return true;
  } catch (err) {
    console.error('Error sending the email:', err.message);
    return false;
  }
};


module.exports = { sendThankYouEmail, sendNewUserEmail };
