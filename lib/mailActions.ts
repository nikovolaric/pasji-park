"use server";

import { sendMailToProvider, sendNewProviderMail } from "./mail";

export async function sendNewProviderMailAction(formData: FormData) {
  try {
    const data = Object.fromEntries(formData) as {
      name: string;
      contact_person: string;
      email: string;
      phone?: string;
      message: string;
    };

    const res = await sendNewProviderMail(data);

    if (!res.includes("250")) {
      throw new Error(res);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function sendEnquiryToProvider(formData: FormData) {
  try {
    const data = Object.fromEntries(formData) as {
      name: string;
      provider_mail: string;
      email: string;
      phone?: string;
      message: string;
    };

    const res = await sendMailToProvider(data);

    if (!res.includes("250")) {
      throw new Error(res);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
