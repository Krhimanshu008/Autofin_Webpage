import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { ContactFormData } from "@/types/database";

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Get the Contact form definition
    const { data: form } = await supabase
      .from("forms")
      .select("id")
      .eq("form_type", "contact")
      .single();

    // 2. Insert form submission
    const { data: submission, error: submissionError } = await supabase
      .from("form_submissions")
      .insert({
        form_id: form?.id || null,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company_name: data.company_name || null,
        message: data.message,
        data: {}, // Any extra fields could go here
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        utm_content: data.utm_content || null,
        utm_term: data.utm_term || null,
        referrer: data.referrer || null,
        landing_page: data.landing_page || null,
      })
      .select("id")
      .single();

    if (submissionError) {
      console.error("Submission error:", submissionError);
      throw new Error("Failed to save submission");
    }

    // 3. Auto-create Lead
    const { error: leadError } = await supabase
      .from("leads")
      .insert({
        submission_id: submission.id,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company_name: data.company_name || null,
        source: data.utm_source || null,
        medium: data.utm_medium || null,
        campaign: data.utm_campaign || null,
        landing_page: data.landing_page || null,
        status: "new",
        notes: `Initial message: ${data.message}`,
      });

    if (leadError) {
      console.error("Lead creation error:", leadError);
      // Don't fail the request if lead creation fails, but log it
    }

    // 4. Send notification email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Contact Request: ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
          <p><strong>Company:</strong> ${data.company_name || "N/A"}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          <hr />
          <h3>Source Data</h3>
          <p><strong>Source:</strong> ${data.utm_source || "N/A"}</p>
          <p><strong>Campaign:</strong> ${data.utm_campaign || "N/A"}</p>
          <p><strong>Landing Page:</strong> ${data.landing_page || "N/A"}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Non-blocking
    }

    // 5. Send confirmation email to user
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "Thank you for reaching out to KR Himanshu",
        html: `
          <p>Hi ${data.name.split(" ")[0]},</p>
          <p>Thank you for getting in touch. I've received your message and will get back to you within 24 hours.</p>
          <p>Best regards,<br/>KR Himanshu</p>
        `,
      });
    } catch (emailError) {
      console.error("Confirmation email error:", emailError);
      // Non-blocking
    }

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
