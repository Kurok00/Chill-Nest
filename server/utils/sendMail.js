const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail({ to, subject, html, from }) {
  const msg = {
    to,
    from: from || 'ChillNest <anvnt96@gmail.com>', // Ưu tiên from truyền vào, fallback về mặc định
    subject,
    html,
  };
  await sgMail.send(msg);
}

module.exports = sendMail;