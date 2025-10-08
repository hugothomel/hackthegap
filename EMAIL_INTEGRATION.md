# Email Integration Guide

The challenge submission form currently logs submissions to the console. To send actual emails, integrate with an email service provider.

## Recommended Services

### 1. Resend (Recommended)
- Easy to use, developer-friendly
- Free tier: 3,000 emails/month
- Great for transactional emails
- Website: https://resend.com

```bash
npm install resend
```

Create `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

Update `app/api/submit-challenge/route.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'submissions@hackthegap.xyz',
  to: 'contact@hackthegap.xyz',
  subject: `Challenge Submission: ${data.challengeTitle}`,
  html: emailBody,
});
```

### 2. SendGrid
- Robust, enterprise-ready
- Free tier: 100 emails/day
- Website: https://sendgrid.com

```bash
npm install @sendgrid/mail
```

### 3. Postmark
- Great for transactional emails
- Free tier: 100 emails/month
- Website: https://postmarkapp.com

## Current Behavior

Without email configuration, the API endpoint:
1. ✅ Accepts the form submission
2. ✅ Formats it as HTML
3. ✅ Logs to console
4. ✅ Returns success response
5. ❌ Doesn't send actual email

## Testing in Development

You can view the formatted HTML email in the terminal/console where Next.js is running.

## Alternative: Save to Database

Instead of/in addition to email, you can save submissions to a database:

```typescript
// Example with Prisma
await prisma.challengeSubmission.create({
  data: {
    ...formData,
    submittedAt: new Date()
  }
});
```

## Production Checklist

- [ ] Set up email service account
- [ ] Add API key to environment variables
- [ ] Update the API route to actually send emails
- [ ] Test with a real submission
- [ ] Set up email monitoring/logs
- [ ] Consider adding rate limiting

