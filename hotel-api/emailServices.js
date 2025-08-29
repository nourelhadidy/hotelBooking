// const nodemailer = require('nodemailer');

// // This function sets up the email transporter. For testing, it uses a temporary
// // Ethereal account that is generated automatically.
// async function createTransporter() {
//     let testAccount = await nodemailer.createTestAccount();

//     console.log('Ethereal test account created for email previews:');
//     console.log(`User: ${testAccount.user}`);
//     console.log(`Pass: ${testAccount.pass}`);

//     // In a real application, you would replace this with your actual email provider's details (e.g., Gmail, SendGrid).
//     return nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false,
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass, // generated ethereal password
//         },
//     });
// }

// /**
//  * Sends a booking confirmation email.
//  * @param {object} user - The user object, which must include 'email' and 'name'.
//  * @param {object} booking - The booking object with all its details.
//  */
// async function sendBookingConfirmationEmail(user, booking) {
//     if (!user || !user.email) {
//         console.error('Email could not be sent because the user email is missing.');
//         return;
//     }

//     try {
//         const transporter = await createTransporter();

//         const mailOptions = {
//             from: '"Your Hotel Name" <noreply@yourhotel.com>',
//             to: user.email,
//             subject: 'Your Booking Confirmation!',
//             html: `
//                 <h1>Booking Confirmed!</h1>
//                 <p>Hello ${user.name || 'Valued Customer'},</p>
//                 <p>Thank you for your booking. Here are the details:</p>
//                 <ul>
//                     <li><strong>Booking ID:</strong> ${booking._id}</li>
//                     <li><strong>Check-in Date:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</li>
//                     <li><strong>Check-out Date:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</li>
//                     <li><strong>Total Price:</strong> $${booking.price}</li>
//                 </ul>
//                 <p>We look forward to your stay!</p>
//             `,
//         };

//         let info = await transporter.sendMail(mailOptions);

//         console.log('Confirmation email sent: %s', info.messageId);
//         // Ethereal gives you a URL to preview the sent email in your browser.
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     } catch (error) {
//         console.error('Error sending confirmation email:', error);
//     }
// }

// module.exports = { sendBookingConfirmationEmail };