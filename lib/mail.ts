import { createTransport, TransportOptions } from "nodemailer";

const transporterOptions = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.NODE_ENV === "production",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
} as TransportOptions;

export async function sendNewProviderMail(options: {
  name: string;
  contact_person: string;
  email: string;
  phone?: string;
  message: string;
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: "Spletna stran mail <info@e-kosmatinec.si>",
    to: "info@e-kosmatinec.si",
    // to: "niko.volaric@gmail.com",
    subject: "Želim postati ponudnik",
    html: `<div style='font-family:Verdana'>Ime in priimek:${
      options.name
    }<br/>Kontaktna oseba:${
      options.contact_person
    }<br/>Mail:${options.email}<br/>Telefonska številka:${options.phone}<br/><br/>${options.message.replaceAll("\r\n", "<br/>")}`,
  };

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res.response;
}

export async function sendMailToProvider(options: {
  name: string;
  provider_mail: string;
  email: string;
  phone?: string;
  message: string;
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: "E-kosmatinec povpraševanje <info@e-kosmatinec.si>",
    to: options.provider_mail,
    // to: "niko.volaric@gmail.com",
    subject: "Povpraševanje",
    html: `<div style='font-family:Verdana'>Ime in priimek:${
      options.name
    }<br/>Elektronski naslov:${options.email}<br/>Telefonska številka:${options.phone}<br/><br/>${options.message.replaceAll("\r\n", "<br/>")}`,
  };

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res.response;
}
