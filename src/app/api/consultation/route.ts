import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { ConsultationFormData } from "@/types/database";

export async function POST(request: Request) {
  try {
    const data: ConsultationFormData = await request.json();
    
    if (!data.name || !data.email || !data.phone || !data.company_name) {
      return NextResponse.json(
        { error: "Name, email, phone, and company are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Get the Consultation form definition
    const { data: form } = await supabase
      .from("forms")
      .select("id")
      .eq("form_type", "consultation")
      .single();

    // 2. Insert form submission
    const { data: submission, error: submissionError } = await supabase
      .from("form_submissions")
      .insert({
        form_id: form?.id || null,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company_name: data.company_name,
        message: data.message || null,
        data: {
          designation: data.designation,
          industry: data.industry,
          company_size: data.company_size,
          service_interest: data.service_interest,
        },
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
        phone: data.phone,
        company_name: data.company_name,
        designation: data.designation || null,
        industry: data.industry || null,
        company_size: data.company_size || null,
        service_interest: data.service_interest || null,
        source: data.utm_source || null,
        medium: data.utm_medium || null,
        campaign: data.utm_campaign || null,
        landing_page: data.landing_page || null,
        status: "new",
        notes: data.message ? `Consultation notes: ${data.message}` : null,
      });

    if (leadError) {
      console.error("Lead creation error:", leadError);
    }

    // 4. Send notification email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Consultation Request: ${data.company_name}`,
        html: `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Company:</strong> ${data.company_name} (${data.company_size || "Size unknown"})</p>
          <p><strong>Role:</strong> ${data.designation || "N/A"}</p>
          <p><strong>Industry:</strong> ${data.industry || "N/A"}</p>
          <p><strong>Interest:</strong> ${data.service_interest || "N/A"}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Notes:</strong> ${data.message || "None"}</p>
          <hr />
          <h3>Marketing Source</h3>
          <p><strong>Source:</strong> ${data.utm_source || "N/A"}</p>
          <p><strong>Campaign:</strong> ${data.utm_campaign || "N/A"}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    // 5. Send confirmation email to user
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "Consultation Request Received — KR Himanshu",
        html: `
          <p>Hi ${data.name.split(" ")[0]},</p>
          <p>Thank you for requesting a consultation. I've received your details and will review them shortly.</p>
          <p>I will reach out within 24 hours to schedule our call.</p>
          <p>Best regards,<br/>KR Himanshu</p>
        `,
      });
    } catch (emailError) {
      console.error("Confirmation email error:", emailError);
    }

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
