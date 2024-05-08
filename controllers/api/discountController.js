/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

// const EnquiryModel = require("../../database/models/enquiry");
const nodemailer = require("nodemailer");
/**
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 */

exports.createDiscount = async (req, res, next) => {
  try {
        const enquiryData = req.body;
        console.log("enquiryData", enquiryData);

//     const enquiry = {
//       firstName: enquiryData.firstName,
//       lastName: enquiryData.lastName,
//       email: enquiryData.email,
//       mobileNumber: enquiryData.mobileNumber,
//     };

    // const newEnquiry = await EnquiryModel.create(enquiry);
//     const eventDate = new Date(enquiryData.eventDate);

//     const formattedDate = `${eventDate.toLocaleDateString()} `;

    const eventDetailEmailContent = `
      <html>
        <body>
         
          <p>Full Name: ${enquiryData.firstName}</p>
           <p>Full Name: ${enquiryData.lastName}</p>
          <p>Email: ${enquiryData.email}</p>
          <p>Mobile Number: ${enquiryData.mobileNumber}</p>
                    <p> Currency: ${enquiryData.currency}</p>
      ${
        enquiryData.currency === "percentage"
          ? `<p>Percentage: ${enquiryData.percentage}%</p>`
          : enquiryData.currency === "rupees"
          ? `<p>Rupees: ${enquiryData.rupees}</p>`
          : "" 
      }
        </body>
      </html>
    `;
 console.log("eventDetailEmailContent", eventDetailEmailContent);
    const enquiryThanksReplyEmailContent = `
      <html>
        <body>
          <p>Thank you for your enquiry. We have received your enquiry.</p>
        </body>
      </html>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.TAMTREE_EMAIL,
        pass: process.env.TAMTREE_EMAIL_PASSWORD,
      },
    });

    //enquired user email id
    // const VanakkamPDXMailOption = {
    //   from: process.env.TAMTREE_EMAIL,
    //   subject: "Enquiry Request Received",
    //   to: enquiryData.email,
    //   html: enquiryThanksReplyEmailContent,
    // };

    const usersMailOptions = {
      from: enquiryData.email,
      subject: "Customer Enquiry Request",
      to: process.env.TAMTREE_EMAIL,
      html: eventDetailEmailContent,
    };

    transporter.sendMail(VanakkamPDXMailOption, (error, info) => {
      if (error) {
        console.error("Vanakkam PDX Email send error:", error);
      } else {
        console.log("Vanakkam PDX  Email sent: " + info.response);
      }
    });

    transporter.sendMail(usersMailOptions, (error, info) => {
      if (error) {
        console.error("user's Email send error:", error);
      } else {
        console.log("user's Email sent: " + info.response);
      }
    });
   
    res.json({
      data: enquiryData,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
