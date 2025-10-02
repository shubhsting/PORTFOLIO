import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      // Fallback: Log to console and return success
      console.log('📧 Contact Form Submission (No email service configured):');
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('---');
      
      return NextResponse.json({
        success: true,
        message: 'Message received! (Email service not configured, but form data logged)'
      });
    }

    // Send email using Resend
    const resend = new Resend(RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's test email
      to: 'shubhamsingh1840@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact from Portfolio 🚀</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; color: #6b7280;"><strong>From:</strong></p>
              <p style="margin: 0; color: #111827; font-size: 16px;">${name}</p>
              <p style="margin: 5px 0 0 0; color: #6366f1;">${email}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; color: #6b7280;"><strong>Subject:</strong></p>
              <p style="margin: 0; color: #111827; font-size: 16px;">${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p style="margin: 0 0 10px 0; color: #6b7280;"><strong>Message:</strong></p>
              <p style="margin: 0; color: #111827; font-size: 16px; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                💡 <strong>Tip:</strong> Reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">Sent from shubhamsingh's portfolio</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!',
      data
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

