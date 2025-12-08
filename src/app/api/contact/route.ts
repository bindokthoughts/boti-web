import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, purpose, message } = body;

    // Validate input
    if (!name || !email || !purpose || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if Gmail credentials are configured
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('Gmail credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Email to admin (bindokthoughts@gmail.com)
    const adminMailOptions = {
      from: `"BOTI Contact Form" <${gmailUser}>`,
      to: 'bindokthoughts@gmail.com',
      subject: `New Contact Form Submission - ${purpose}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This email was sent from the BOTI website contact form.</p>
        </div>
      `
    };

    // Email to user (thank you email)
    const userMailOptions = {
      from: `"BOTI" <${gmailUser}>`,
      to: email,
      subject: 'Thank you for contacting BOTI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for reaching out, ${name}!</h2>
          <p>We've received your message and will get back to you shortly.</p>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="margin-top: 0;">Your message details:</h3>
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p>Best regards,<br><strong>The BOTI Team</strong></p>
          <p style="color: #666; font-size: 12px;">If you didn't submit this form, please ignore this email.</p>
        </div>
      `
    };

    // Send both emails
    console.log('Sending emails...');
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('Admin email sent:', adminResult.messageId);
    console.log('User email sent:', userResult.messageId);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send emails',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
