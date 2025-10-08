# Challenge Submission System

## Overview

The challenge submission system has been upgraded from a simple `mailto:` link to a professional server-side API with proper form handling and beautifully formatted HTML emails.

## What Was Built

### 1. **API Endpoint** (`/api/submit-challenge/route.ts`)
- Accepts POST requests with JSON form data
- Formats submission into professional HTML email
- Beautiful email template with:
  - Color-coded sections
  - Proper hierarchy and structure
  - Responsive design
  - Neo-brutalist styling matching the site
- Returns JSON response with success/error status
- Logs to console in development

### 2. **Updated ChallengeWizard** (`/app/components/ChallengeWizard.tsx`)
- Changed from `mailto:` to `fetch()` API call
- Added loading state during submission
- Shows user-friendly success/error messages
- Handles network errors gracefully
- Disabled submit button while processing

## How It Works

### User Flow:
1. User fills out the multi-step wizard
2. Clicks "Submit Challenge"
3. Button shows "Submitting..." and becomes disabled
4. Form data is sent as JSON to `/api/submit-challenge`
5. Server processes and formats the data
6. User sees success message
7. Draft is cleared and modal closes

### Server Flow:
1. Receives JSON POST request
2. Extracts all form fields
3. Generates beautiful HTML email with:
   - Executive overview
   - Contextual background
   - Problem deep dive
   - Solution pathways
   - Validation framework
   - Resources & commitment
   - Strategic context
   - Administrative info
4. Returns success response

## Email Format

The generated email includes:
- **Color-coded sections** matching the site theme
- **Proper hierarchy** with headers and sub-sections
- **Conditional fields** (only shows filled fields)
- **Lists** for arrays (case studies, stakeholders, etc.)
- **Links** for repository/data URLs
- **Professional styling** with borders and shadows
- **Responsive design** that works on all email clients

## Current State (Development)

✅ Form submission works  
✅ API endpoint accepts data  
✅ HTML email is generated  
✅ Console logging enabled  
❌ Email not actually sent (needs email service)

## Production Setup

To enable actual email sending, see [`EMAIL_INTEGRATION.md`](./EMAIL_INTEGRATION.md) for:
- Recommended email services (Resend, SendGrid, Postmark)
- Setup instructions
- Environment variable configuration
- Code examples

## Testing

### Test the API directly:
```bash
curl -X POST http://localhost:3002/api/submit-challenge \
  -H "Content-Type: application/json" \
  -d '{
    "challengeTitle": "Test Challenge",
    "executiveSummary": "Testing the system",
    "email": "test@example.com",
    "primaryContact": "Test User",
    "institution": "Test Organization"
  }'
```

### Test through UI:
1. Click "Propose a Challenge" on homepage
2. Fill out the wizard
3. Submit
4. Check terminal logs for formatted email
5. Verify success message appears

## Benefits Over mailto:

1. ✅ **No length limits** - Send as much data as needed
2. ✅ **Proper formatting** - HTML emails with styling
3. ✅ **Server-side validation** - Can add validation rules
4. ✅ **Database integration** - Easy to save submissions
5. ✅ **Better UX** - Loading states, error handling
6. ✅ **Analytics** - Track submission rates
7. ✅ **Spam prevention** - Add rate limiting, captcha
8. ✅ **File attachments** - Can add in the future
9. ✅ **Email queuing** - Can use background jobs
10. ✅ **Professional appearance** - Properly formatted emails

## Next Steps

To complete the email integration:

1. **Choose an email service** (Resend recommended)
2. **Sign up and get API key**
3. **Install package**: `npm install resend`
4. **Add to `.env.local`**: `RESEND_API_KEY=your_key`
5. **Update API route** to actually send emails
6. **Test in production**

See [`EMAIL_INTEGRATION.md`](./EMAIL_INTEGRATION.md) for detailed instructions.

## File Structure

```
app/
├── api/
│   └── submit-challenge/
│       └── route.ts          # API endpoint
├── components/
│   └── ChallengeWizard.tsx   # Updated to use API
└── page.tsx                   # Landing page

docs/
├── EMAIL_INTEGRATION.md       # Email service setup guide
└── CHALLENGE_SUBMISSION.md    # This file
```

## API Response Format

### Success:
```json
{
  "success": true,
  "message": "Challenge submitted successfully!",
  "submittedAt": "2025-10-08T10:12:34.986Z"
}
```

### Error:
```json
{
  "success": false,
  "error": "Failed to submit challenge"
}
```

## Security Considerations

Before production deployment:

- [ ] Add rate limiting (prevent spam)
- [ ] Add CORS configuration
- [ ] Validate all input fields
- [ ] Sanitize HTML in emails
- [ ] Add honeypot field (anti-bot)
- [ ] Consider adding reCAPTCHA
- [ ] Log failed submissions
- [ ] Add email verification
- [ ] Set up monitoring/alerts

## Maintenance

The system is designed to be easily maintainable:

1. **Email template** - All in one file, easy to update
2. **Form fields** - Already structured, just add to template
3. **Validation** - Can add server-side validation easily
4. **Error handling** - Already built in with try-catch
5. **Logging** - Console logs for development debugging

## Troubleshooting

### Common Issues:

**Issue**: "Failed to submit. Please check your internet connection"  
**Solution**: Check if dev server is running, verify API route exists

**Issue**: "There was an error submitting your challenge"  
**Solution**: Check server logs, verify JSON payload is valid

**Issue**: Email not formatted properly  
**Solution**: Email clients vary; the HTML is optimized for most clients

**Issue**: Submission seems slow  
**Solution**: Normal for dev mode; production will be faster

---

*Last updated: October 8, 2025*

