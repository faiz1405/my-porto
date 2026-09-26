'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(formData: { firstName: string, lastName: string, email: string, phoneNumber: string, message: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'yusufnurfaizip05@gmail.com',
      subject: `Pesan Baru dari ${formData.firstName} ${formData.lastName} - Portfolio`,
      html: `
        <h2>Pesan Baru dari Website Portfolio</h2>
        <p><strong>Nama:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>No. Telepon:</strong> ${formData.phoneNumber || 'Tidak dicantumkan'}</p>
        <br />
        <p><strong>Pesan:</strong></p>
        <p>${formData.message}</p>
      `
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Resend Error:", error);
    throw new Error('Gagal mengirim email');
  }
}