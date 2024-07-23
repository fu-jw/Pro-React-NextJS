import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const url = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "验证邮箱",
    // react: EmailTemplate({ url }),
    html: `<div>
      <h1>欢迎，请验证您的邮箱</h1>
      <p>点击下面的链接进行验证：</p>
      <a href="${url}">${url}</a>
    </div>`,
  });
};
