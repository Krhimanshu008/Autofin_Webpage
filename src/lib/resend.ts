import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender — update once domain is verified in Resend
export const FROM_EMAIL = "KR Himanshu <onboarding@resend.dev>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "himanshu@krhimanshu.in";
