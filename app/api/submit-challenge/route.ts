import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  // Initialize Resend only when API is called (not at build time)
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const data = await request.json();
    
    // Format the email body with proper HTML
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #00D9C0; border-bottom: 4px solid #000; padding-bottom: 10px; }
    h2 { color: #000; background: #FFD93D; padding: 10px; margin-top: 30px; border: 3px solid #000; }
    .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #00D9C0; }
    .field { margin: 10px 0; }
    .label { font-weight: bold; color: #000; }
    .value { margin-left: 20px; }
    ul { list-style: none; padding-left: 0; }
    li { padding: 5px 0; padding-left: 20px; position: relative; }
    li:before { content: "▸"; position: absolute; left: 0; color: #00D9C0; font-weight: bold; }
    .separator { border-top: 2px solid #ddd; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>🎯 Challenge Submission: ${data.challengeTitle}</h1>
  
  <h2>1️⃣ Executive Overview</h2>
  <div class="section">
    <div class="field">
      <div class="label">Title:</div>
      <div class="value">${data.challengeTitle}</div>
    </div>
    <div class="field">
      <div class="label">Summary:</div>
      <div class="value">${data.executiveSummary}</div>
    </div>
    <div class="field">
      <div class="label">Population Affected:</div>
      <div class="value">${data.populationAffected}</div>
    </div>
    <div class="field">
      <div class="label">Economic/Social Cost:</div>
      <div class="value">${data.economicSocialCost}</div>
    </div>
    <div class="field">
      <div class="label">Opportunity if Solved:</div>
      <div class="value">${data.opportunityIfSolved}</div>
    </div>
    <div class="field">
      <div class="label">Strategic Importance:</div>
      <div class="value">${data.strategicImportance}</div>
    </div>
  </div>

  <h2>2️⃣ Contextual Background</h2>
  <div class="section">
    <div class="field">
      <div class="label">Problem Genesis:</div>
      <div class="value">${data.problemGenesis}</div>
    </div>
    ${data.theoreticalFramework ? `
    <div class="field">
      <div class="label">Theoretical Framework:</div>
      <div class="value">${data.theoreticalFramework}</div>
    </div>
    ` : ''}
    
    ${data.previousAttempts?.some((a: any) => a.initiative) ? `
    <div class="field">
      <div class="label">Previous Attempts:</div>
      <ul>
        ${data.previousAttempts.filter((a: any) => a.initiative).map((a: any, i: number) => `
          <li><strong>${a.initiative}</strong> (${a.period})<br>
              Outcome: ${a.outcome}<br>
              Learnings: ${a.learnings}<br>
              Budget: ${a.budget}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.stakeholders?.some((s: any) => s.name) ? `
    <div class="field">
      <div class="label">Stakeholders:</div>
      <ul>
        ${data.stakeholders.filter((s: any) => s.name).map((s: any) => `
          <li><strong>${s.name}</strong> - ${s.role}<br>
              Interests: ${s.interests}<br>
              Authority: ${s.authority}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
  </div>

  <h2>3️⃣ Problem Deep Dive</h2>
  <div class="section">
    ${data.caseStudies?.some((c: any) => c.context) ? `
    <div class="field">
      <div class="label">Case Studies:</div>
      ${data.caseStudies.filter((c: any) => c.context).map((c: any, i: number) => `
        <div style="margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #FF6B9D;">
          <strong>Case ${i + 1}:</strong><br>
          <strong>Context:</strong> ${c.context}<br>
          <strong>Impact:</strong> ${c.impact}<br>
          ${c.evidence ? `<strong>Evidence:</strong> ${c.evidence}<br>` : ''}
          ${c.story ? `<strong>Story:</strong> ${c.story}` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    ${data.dataRepositoryLink ? `
    <div class="field">
      <div class="label">Data Repository:</div>
      <div class="value"><a href="${data.dataRepositoryLink}">${data.dataRepositoryLink}</a></div>
    </div>
    ` : ''}
    
    ${data.regulatoryFramework ? `
    <div class="field">
      <div class="label">Regulatory Framework:</div>
      <div class="value">${data.regulatoryFramework}</div>
    </div>
    ` : ''}
    
    ${data.resourceLimitations ? `
    <div class="field">
      <div class="label">Resource Limitations:</div>
      <div class="value">${data.resourceLimitations}</div>
    </div>
    ` : ''}
    
    ${data.culturalSensitivities ? `
    <div class="field">
      <div class="label">Cultural/Political Sensitivities:</div>
      <div class="value">${data.culturalSensitivities}</div>
    </div>
    ` : ''}
    
    ${data.technicalInfrastructure ? `
    <div class="field">
      <div class="label">Technical Infrastructure:</div>
      <div class="value">${data.technicalInfrastructure}</div>
    </div>
    ` : ''}
  </div>

  <h2>4️⃣ Solution Pathways</h2>
  <div class="section">
    ${data.pathways?.filter((p: any) => p.name).map((p: any, i: number) => `
      <div style="margin: 20px 0; padding: 15px; background: white; border: 3px solid #C996FF;">
        <h3 style="margin-top: 0; color: #C996FF;">Pathway ${i + 1}: ${p.name}</h3>
        ${p.hypothesis ? `<div class="field"><strong>Hypothesis:</strong> ${p.hypothesis}</div>` : ''}
        ${p.mechanism ? `<div class="field"><strong>Mechanism:</strong> ${p.mechanism}</div>` : ''}
        ${p.beneficiaries ? `<div class="field"><strong>Beneficiaries:</strong> ${p.beneficiaries} (${p.beneficiariesCount})</div>` : ''}
        ${p.readinessLevel ? `<div class="field"><strong>Readiness:</strong> ${p.readinessLevel}</div>` : ''}
        ${p.barriers ? `<div class="field"><strong>Barriers:</strong> ${p.barriers}</div>` : ''}
        ${p.uncertainties ? `<div class="field"><strong>Uncertainties:</strong> ${p.uncertainties}</div>` : ''}
        ${p.analogousSolutions ? `<div class="field"><strong>Analogous Solutions:</strong> ${p.analogousSolutions}</div>` : ''}
        ${p.resourcesRequired ? `<div class="field"><strong>Resources Required:</strong> ${p.resourcesRequired}</div>` : ''}
      </div>
    `).join('')}
    
    ${data.deadEnds?.some((d: any) => d.approach) ? `
    <div class="field" style="margin-top: 20px;">
      <div class="label" style="color: #DC2626;">⚠️ Known Dead Ends:</div>
      <ul>
        ${data.deadEnds.filter((d: any) => d.approach).map((d: any) => `
          <li><strong>${d.approach}</strong><br>
              Why it seemed promising: ${d.promising}<br>
              Why it failed: ${d.failed}<br>
              Evidence: ${d.evidence}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
  </div>

  <h2>5️⃣ Validation Framework</h2>
  <div class="section">
    ${data.immediateMetrics?.some((m: any) => m.metric) ? `
    <div class="field">
      <div class="label">Immediate Metrics (Weekend):</div>
      <ul>
        ${data.immediateMetrics.filter((m: any) => m.metric).map((m: any) => `
          <li><strong>${m.metric}</strong><br>Target: ${m.target}<br>Method: ${m.method}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.shortTermMetrics?.some((m: any) => m.metric) ? `
    <div class="field">
      <div class="label">Short-term Metrics (1-3 months):</div>
      <ul>
        ${data.shortTermMetrics.filter((m: any) => m.metric).map((m: any) => `
          <li><strong>${m.metric}</strong><br>Target: ${m.target}<br>Method: ${m.method}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.mediumTermMetrics?.some((m: any) => m.metric) ? `
    <div class="field">
      <div class="label">Medium-term Metrics (6-12 months):</div>
      <ul>
        ${data.mediumTermMetrics.filter((m: any) => m.metric).map((m: any) => `
          <li><strong>${m.metric}</strong><br>Target: ${m.target}<br>Method: ${m.method}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.longTermMetrics?.some((m: any) => m.metric) ? `
    <div class="field">
      <div class="label">Long-term Metrics (2+ years):</div>
      <ul>
        ${data.longTermMetrics.filter((m: any) => m.metric).map((m: any) => `
          <li><strong>${m.metric}</strong><br>Target: ${m.target}<br>Method: ${m.method}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.adoptionBarriers ? `
    <div class="field">
      <div class="label">Adoption Barriers:</div>
      <div class="value">${data.adoptionBarriers}</div>
    </div>
    ` : ''}
  </div>

  <h2>6️⃣ Resources & Commitment</h2>
  <div class="section">
    <div class="field">
      <div class="label">Lead Expert:</div>
      <div class="value">
        <strong>${data.leadExpertName}</strong><br>
        Email: ${data.leadExpertEmail}<br>
        ${data.leadExpertMobile ? `Mobile: ${data.leadExpertMobile}<br>` : ''}
        ${data.leadExpertBio ? `Bio: ${data.leadExpertBio}` : ''}
      </div>
    </div>
    
    <div class="field">
      <div class="label">Event Availability:</div>
      <div class="value">
        ${data.fridayAvailability ? `Friday: ${data.fridayAvailability}<br>` : ''}
        ${data.saturdayHours ? `Saturday: ${data.saturdayHours}<br>` : ''}
        ${data.sundayHours ? `Sunday: ${data.sundayHours}<br>` : ''}
        ${data.preferredCommunication ? `Preferred Communication: ${data.preferredCommunication}` : ''}
      </div>
    </div>
    
    ${data.dataProvided?.length > 0 ? `
    <div class="field">
      <div class="label">Data Provided:</div>
      <ul>
        ${data.dataProvided.map((d: string) => `<li>${d}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.expertSupport?.length > 0 ? `
    <div class="field">
      <div class="label">Expert Support:</div>
      <ul>
        ${data.expertSupport.map((e: string) => `<li>${e}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.testingInfrastructure?.length > 0 ? `
    <div class="field">
      <div class="label">Testing Infrastructure:</div>
      <ul>
        ${data.testingInfrastructure.map((t: string) => `<li>${t}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${data.postEventCommitment?.length > 0 ? `
    <div class="field">
      <div class="label">Post-Event Commitment:</div>
      <ul>
        ${data.postEventCommitment.map((c: string) => `<li>${c}</li>`).join('')}
      </ul>
      ${data.pilotTimeline ? `<div style="margin-top: 10px;"><strong>Pilot Timeline:</strong> ${data.pilotTimeline}</div>` : ''}
      ${data.pilotBudget ? `<div><strong>Pilot Budget:</strong> ${data.pilotBudget}</div>` : ''}
    </div>
    ` : ''}
  </div>

  <h2>7️⃣ Strategic Context</h2>
  <div class="section">
    <div class="field">
      <div class="label">Why Now:</div>
      <div class="value">${data.whyNow}</div>
    </div>
    ${data.globalAlignment ? `
    <div class="field">
      <div class="label">Global Alignment:</div>
      <div class="value">${data.globalAlignment}</div>
    </div>
    ` : ''}
    <div class="field">
      <div class="label">Unique Position:</div>
      <div class="value">${data.uniquePosition}</div>
    </div>
    <div class="field">
      <div class="label">Message to Innovators:</div>
      <div class="value">${data.messageToInnovators}</div>
    </div>
  </div>

  <h2>📋 Administrative Information</h2>
  <div class="section">
    <div class="field">
      <div class="label">Primary Contact:</div>
      <div class="value">${data.primaryContact}</div>
    </div>
    <div class="field">
      <div class="label">Institution:</div>
      <div class="value">${data.institution}</div>
    </div>
    <div class="field">
      <div class="label">Email:</div>
      <div class="value">${data.email}</div>
    </div>
    ${data.alternativeContact ? `
    <div class="field">
      <div class="label">Alternative Contact:</div>
      <div class="value">${data.alternativeContact}</div>
    </div>
    ` : ''}
    <div class="field">
      <div class="label">Submission Date:</div>
      <div class="value">${new Date().toLocaleString('en-US', { 
        dateStyle: 'full', 
        timeStyle: 'short',
        timeZone: 'Europe/Paris'
      })}</div>
    </div>
  </div>

  <div class="separator"></div>
  <p style="text-align: center; color: #666; font-size: 14px;">
    <strong>Hack the Gap 2025</strong> | Building products that matter<br>
    <a href="https://hackthegap.xyz">hackthegap.xyz</a>
  </p>
</body>
</html>
    `.trim();

    // Log to console for development
    console.log('Challenge Submission Received:');
    console.log('Title:', data.challengeTitle);
    console.log('From:', data.primaryContact, '<' + data.email + '>');
    
    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'submissions@hackthegap.xyz',
      to: process.env.SUBMISSION_EMAIL || 'contact@hackthegap.xyz',
      subject: `🎯 Challenge Submission: ${data.challengeTitle}`,
      html: emailBody,
      replyTo: data.email,
    });

    console.log('Email sent successfully:', emailResult);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Challenge submitted successfully!',
      submittedAt: new Date().toISOString(),
      emailId: emailResult.data?.id
    });
    
  } catch (error) {
    console.error('Error submitting challenge:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit challenge' },
      { status: 500 }
    );
  }
}

