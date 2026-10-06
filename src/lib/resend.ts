import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender — update once domain is verified in Resend
export const FROM_EMAIL = "KR Himanshu <info@krhimanshu.in>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@krhimanshu.in";
