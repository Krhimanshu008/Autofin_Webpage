import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";

function calculateScore(answers: Record<string, string>) {
  let score = 0;
  
  // MIS
  if (answers.mis === "yes_regularly") score += 25;
  else if (answers.mis === "yes_delayed") score += 10;
  
  // Books
  if (answers.books_close === "<7") score += 25;
  else if (answers.books_close === "7-15") score += 10;
  
  // Budget
  if (answers.budget === "yes_tracked") score += 25;
  else if (answers.budget === "yes_untracked") score += 10;
  
  // Controls
  if (answers.controls === "yes") score += 25;
  else if (answers.controls === "partial") score += 10;

  let feedback = "";
  if (score >= 80) {
    feedback = "Your finance function is well-structured and positioned for scale. However, there may be opportunities for advanced automation and strategic optimization to further enhance efficiency.";
  } else if (score >= 40) {
    feedback = "You have basic financial processes in place, but there are significant gaps. Delayed reporting or manual controls are likely slowing down your decision-making and increasing risk.";
  } else {
    feedback = "Your finance function requires immediate attention. A lack of visibility and controls can severely impact cash flow and scalability. We highly recommend a comprehensive financial restructuring.";
  }

  return { score, feedback };
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email || !data.company || !data.answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { score, feedback } = calculateScore(data.answers);

    const supabase = createAdminClient();

    // 1. Get the Health Check form definition
    const { data: form } = await supabase
      .from("forms")
      .select("id")
      .eq("form_type", "health_check")
      .single();

    // 2. Insert form submission
    const { data: submission, error: submissionError } = await supabase
      .from("form_submissions")
      .insert({
        form_id: form?.id || null,
        name: data.name,
        email: data.email,
        company_name: data.company,
        data: {
          answers: data.answers,
          score,
          feedback
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
        company_name: data.company,
        source: data.utm_source || null,
        medium: data.utm_medium || null,
        campaign: data.utm_campaign || null,
        landing_page: data.landing_page || null,
        status: "new",
        notes: `Health Check Score: ${score}/100\nAnswers: ${JSON.stringify(data.answers)}`,
      });

    if (leadError) {
      console.error("Lead creation error:", leadError);
    }

    // 4. Send notification email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Health Check Lead: ${data.company} (Score: ${score})`,
        html: `
          <h2>New Health Check Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Score:</strong> ${score}/100</p>
          <hr />
          <h3>Marketing Source</h3>
          <p><strong>Source:</strong> ${data.utm_source || "N/A"}</p>
          <p><strong>Campaign:</strong> ${data.utm_campaign || "N/A"}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    // 5. Send confirmation/results email to user
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "Your Finance Function Health Check Results",
        html: `
          <p>Hi ${data.name.split(" ")[0]},</p>
          <p>Thank you for taking the Finance Function Health Check.</p>
          <h2>Your Score: ${score}/100</h2>
          <p>${feedback}</p>
          <br/>
          <p>If you'd like to discuss these results and how we can help improve your finance function, <a href="${process.env.NEXT_PUBLIC_SITE_URL}/book-consultation">book a free consultation with me here</a>.</p>
          <p>Best regards,<br/>KR Himanshu</p>
        `,
      });
    } catch (emailError) {
      console.error("Confirmation email error:", emailError);
    }

    return NextResponse.json({ success: true, score, feedback });
  } catch (error) {
    console.error("Health Check API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
