'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Save, X, CheckCircle, Circle } from 'lucide-react';

interface ChallengeFormData {
  // 1. Executive Overview
  challengeTitle: string;
  executiveSummary: string;
  populationAffected: string;
  economicSocialCost: string;
  opportunityIfSolved: string;
  strategicImportance: string;

  // 2. Contextual Background
  problemGenesis: string;
  previousAttempts: Array<{
    initiative: string;
    period: string;
    outcome: string;
    learnings: string;
    budget: string;
  }>;
  stakeholders: Array<{
    name: string;
    role: string;
    interests: string;
    constraints: string;
    authority: string;
  }>;
  theoreticalFramework: string;

  // 3. Problem Deep Dive
  caseStudies: Array<{
    context: string;
    impact: string;
    evidence: string;
    story: string;
  }>;
  availableData: Array<{
    type: string;
    description: string;
    format: string;
    access: string;
    contact: string;
  }>;
  dataRepositoryLink: string;
  regulatoryFramework: string;
  resourceLimitations: string;
  culturalSensitivities: string;
  technicalInfrastructure: string;

  // 4. Solution Pathways
  pathways: Array<{
    name: string;
    hypothesis: string;
    mechanism: string;
    beneficiaries: string;
    beneficiariesCount: string;
    readinessLevel: string;
    barriers: string;
    uncertainties: string;
    analogousSolutions: string;
    resourcesRequired: string;
  }>;
  deadEnds: Array<{
    approach: string;
    promising: string;
    failed: string;
    evidence: string;
  }>;

  // 5. Validation Framework
  immediateMetrics: Array<{
    metric: string;
    target: string;
    method: string;
  }>;
  shortTermMetrics: Array<{
    metric: string;
    target: string;
    method: string;
  }>;
  mediumTermMetrics: Array<{
    metric: string;
    target: string;
    method: string;
  }>;
  longTermMetrics: Array<{
    metric: string;
    target: string;
    method: string;
  }>;
  earlyAdopters: Array<{
    segment: string;
    size: string;
    painLevel: string;
    readiness: string;
    accessMethod: string;
  }>;
  adoptionBarriers: string;

  // 6. Resources and Commitment
  dataProvided: string[];
  expertSupport: string[];
  testingInfrastructure: string[];
  leadExpertName: string;
  leadExpertEmail: string;
  leadExpertMobile: string;
  leadExpertBio: string;
  fridayAvailability: string;
  saturdayHours: string;
  sundayHours: string;
  preferredCommunication: string;
  postEventCommitment: string[];
  pilotTimeline: string;
  pilotBudget: string;

  // 7. Strategic Context
  whyNow: string;
  globalAlignment: string;
  uniquePosition: string;
  messageToInnovators: string;

  // Administrative
  submissionDate: string;
  primaryContact: string;
  institution: string;
  email: string;
  alternativeContact: string;
}

const STORAGE_KEY = 'hackthegap_challenge_draft';

const initialFormData: ChallengeFormData = {
  challengeTitle: '',
  executiveSummary: '',
  populationAffected: '',
  economicSocialCost: '',
  opportunityIfSolved: '',
  strategicImportance: '',
  problemGenesis: '',
  previousAttempts: [{ initiative: '', period: '', outcome: '', learnings: '', budget: '' }],
  stakeholders: [{ name: '', role: '', interests: '', constraints: '', authority: '' }],
  theoreticalFramework: '',
  caseStudies: [{ context: '', impact: '', evidence: '', story: '' }, { context: '', impact: '', evidence: '', story: '' }],
  availableData: [{ type: '', description: '', format: '', access: '', contact: '' }],
  dataRepositoryLink: '',
  regulatoryFramework: '',
  resourceLimitations: '',
  culturalSensitivities: '',
  technicalInfrastructure: '',
  pathways: [
    { name: '', hypothesis: '', mechanism: '', beneficiaries: '', beneficiariesCount: '', readinessLevel: '', barriers: '', uncertainties: '', analogousSolutions: '', resourcesRequired: '' },
    { name: '', hypothesis: '', mechanism: '', beneficiaries: '', beneficiariesCount: '', readinessLevel: '', barriers: '', uncertainties: '', analogousSolutions: '', resourcesRequired: '' },
    { name: '', hypothesis: '', mechanism: '', beneficiaries: '', beneficiariesCount: '', readinessLevel: '', barriers: '', uncertainties: '', analogousSolutions: '', resourcesRequired: '' }
  ],
  deadEnds: [{ approach: '', promising: '', failed: '', evidence: '' }],
  immediateMetrics: [{ metric: '', target: '', method: '' }],
  shortTermMetrics: [{ metric: '', target: '', method: '' }],
  mediumTermMetrics: [{ metric: '', target: '', method: '' }],
  longTermMetrics: [{ metric: '', target: '', method: '' }],
  earlyAdopters: [{ segment: '', size: '', painLevel: '', readiness: '', accessMethod: '' }],
  adoptionBarriers: '',
  dataProvided: [],
  expertSupport: [],
  testingInfrastructure: [],
  leadExpertName: '',
  leadExpertEmail: '',
  leadExpertMobile: '',
  leadExpertBio: '',
  fridayAvailability: '',
  saturdayHours: '',
  sundayHours: '',
  preferredCommunication: '',
  postEventCommitment: [],
  pilotTimeline: '',
  pilotBudget: '',
  whyNow: '',
  globalAlignment: '',
  uniquePosition: '',
  messageToInnovators: '',
  submissionDate: '',
  primaryContact: '',
  institution: '',
  email: '',
  alternativeContact: ''
};

interface ChallengeWizardProps {
  onClose: () => void;
}

export default function ChallengeWizard({ onClose }: ChallengeWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ChallengeFormData>(initialFormData);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const steps = [
    { id: 0, title: 'Executive Overview', description: 'High-level problem statement' },
    { id: 1, title: 'Context', description: 'Background and stakeholders' },
    { id: 2, title: 'Problem Deep Dive', description: 'Case studies and data' },
    { id: 3, title: 'Solution Pathways', description: 'Proposed approaches' },
    { id: 4, title: 'Validation', description: 'Success metrics' },
    { id: 5, title: 'Resources', description: 'Your commitment' },
    { id: 6, title: 'Strategic Context', description: 'Why now' },
    { id: 7, title: 'Review & Submit', description: 'Final check' }
  ];

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.data);
        setLastSaved(new Date(parsed.timestamp));
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 30000);
    return () => clearInterval(interval);
  }, [formData]);

  const saveDraft = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data: formData,
        timestamp: new Date().toISOString()
      }));
      setLastSaved(new Date());
    } catch (e) {
      console.error('Failed to save draft:', e);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLastSaved(null);
  };

  const updateFormData = (updates: Partial<ChallengeFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addArrayItem = <K extends keyof ChallengeFormData>(
    field: K,
    item: ChallengeFormData[K] extends Array<infer T> ? T : never
  ) => {
    const current = formData[field] as any[];
    updateFormData({ [field]: [...current, item] } as any);
  };

  const removeArrayItem = <K extends keyof ChallengeFormData>(field: K, index: number) => {
    const current = formData[field] as any[];
    updateFormData({ [field]: current.filter((_, i) => i !== index) } as any);
  };

  const updateArrayItem = <K extends keyof ChallengeFormData>(
    field: K,
    index: number,
    updates: Partial<ChallengeFormData[K] extends Array<infer T> ? T : never>
  ) => {
    const current = formData[field] as any[];
    const newArray = [...current];
    newArray[index] = { ...newArray[index], ...updates };
    updateFormData({ [field]: newArray } as any);
  };

  const handleSubmit = () => {
    // Create email body with all data
    const body = `
PROBLEM STATEMENT SUBMISSION

=== 1. EXECUTIVE OVERVIEW ===
Title: ${formData.challengeTitle}
Summary: ${formData.executiveSummary}
Population Affected: ${formData.populationAffected}
Economic/Social Cost: ${formData.economicSocialCost}
Opportunity: ${formData.opportunityIfSolved}
Strategic Importance: ${formData.strategicImportance}

=== 2. CONTEXTUAL BACKGROUND ===
Problem Genesis: ${formData.problemGenesis}
Theoretical Framework: ${formData.theoreticalFramework}

Previous Attempts:
${formData.previousAttempts.map((a, i) => `${i + 1}. ${a.initiative} (${a.period}): ${a.outcome}`).join('\n')}

Stakeholders:
${formData.stakeholders.map((s, i) => `${i + 1}. ${s.name} - ${s.role}`).join('\n')}

=== 3. PROBLEM DEEP DIVE ===
Case Studies:
${formData.caseStudies.map((c, i) => `${i + 1}. Context: ${c.context}\n   Impact: ${c.impact}`).join('\n\n')}

Data Repository: ${formData.dataRepositoryLink}
Regulatory Framework: ${formData.regulatoryFramework}
Resource Limitations: ${formData.resourceLimitations}

=== 4. SOLUTION PATHWAYS ===
${formData.pathways.map((p, i) => `
Pathway ${i + 1}: ${p.name}
Hypothesis: ${p.hypothesis}
Mechanism: ${p.mechanism}
Beneficiaries: ${p.beneficiaries}
`).join('\n')}

=== 5. VALIDATION FRAMEWORK ===
Immediate Metrics: ${formData.immediateMetrics.map(m => m.metric).join(', ')}
Adoption Barriers: ${formData.adoptionBarriers}

=== 6. RESOURCES & COMMITMENT ===
Lead Expert: ${formData.leadExpertName} (${formData.leadExpertEmail})
Friday Availability: ${formData.fridayAvailability}
Post-Event Commitment: ${formData.postEventCommitment.join(', ')}

=== 7. STRATEGIC CONTEXT ===
Why Now: ${formData.whyNow}
Global Alignment: ${formData.globalAlignment}
Message to Innovators: ${formData.messageToInnovators}

=== ADMINISTRATIVE ===
Primary Contact: ${formData.primaryContact}
Institution: ${formData.institution}
Email: ${formData.email}
    `.trim();

    window.location.href = `mailto:contact@hackthegap.xyz?subject=Challenge Submission: ${encodeURIComponent(formData.challengeTitle)}&body=${encodeURIComponent(body)}`;
    
    clearDraft();
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      saveDraft();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-5xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#FFD93D] border-b-4 border-black p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Submit a Challenge</h2>
            <p className="font-bold mt-1">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
          </div>
          <div className="flex items-center gap-4">
            {lastSaved && (
              <div className="hidden md:flex items-center gap-2 text-sm font-bold bg-white px-3 py-1 border-2 border-black">
                <Save size={16} />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
            <button 
              onClick={onClose}
              className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[#333] transition-colors"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="border-b-4 border-black bg-white">
          <div className="flex overflow-x-auto">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex-1 min-w-[100px] p-3 border-r-4 border-black last:border-r-0 transition-colors ${
                  index === currentStep
                    ? 'bg-[#00D9C0]'
                    : index < currentStep
                    ? 'bg-[#6BCF7F]'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  {index < currentStep ? (
                    <CheckCircle size={16} strokeWidth={3} />
                  ) : (
                    <Circle size={16} strokeWidth={3} />
                  )}
                  <span className="font-black text-xs hidden sm:inline">{index + 1}</span>
                </div>
                <div className="font-bold text-xs hidden md:block">{step.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {currentStep === 0 && <Step1ExecutiveOverview formData={formData} updateFormData={updateFormData} />}
          {currentStep === 1 && <Step2Context formData={formData} updateFormData={updateFormData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} updateArrayItem={updateArrayItem} />}
          {currentStep === 2 && <Step3DeepDive formData={formData} updateFormData={updateFormData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} updateArrayItem={updateArrayItem} />}
          {currentStep === 3 && <Step4Pathways formData={formData} updateFormData={updateFormData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} updateArrayItem={updateArrayItem} />}
          {currentStep === 4 && <Step5Validation formData={formData} updateFormData={updateFormData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} updateArrayItem={updateArrayItem} />}
          {currentStep === 5 && <Step6Resources formData={formData} updateFormData={updateFormData} />}
          {currentStep === 6 && <Step7Strategic formData={formData} updateFormData={updateFormData} />}
          {currentStep === 7 && <Step8Review formData={formData} />}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-black p-6 bg-white flex justify-between items-center">
          <button
            onClick={saveDraft}
            className="flex items-center gap-2 px-6 py-3 border-4 border-black font-black uppercase hover:bg-gray-100 transition-colors"
          >
            <Save size={20} strokeWidth={3} />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 border-4 border-black font-black uppercase hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
                <span className="hidden sm:inline">Previous</span>
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-[#00D9C0] px-6 py-3 border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-[#00D9C0] px-8 py-3 border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Submit Challenge
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function Step1ExecutiveOverview({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#FFD93D] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">1️⃣ Executive Overview</h3>
        <p className="font-bold">Provide a high-level summary of your challenge. This will be the first thing teams see.</p>
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Challenge Title *
        </label>
        <input
          type="text"
          required
          maxLength={100}
          value={formData.challengeTitle}
          onChange={(e) => updateFormData({ challengeTitle: e.target.value })}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="A compelling title (max 10 words)"
        />
        <p className="text-sm font-bold mt-1 opacity-70">Example: "Making Clean Water Accessible in Rural Communities"</p>
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Executive Summary *
        </label>
        <textarea
          required
          value={formData.executiveSummary}
          onChange={(e) => updateFormData({ executiveSummary: e.target.value })}
          rows={4}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="In 3-5 lines, describe the problem and why it requires urgent attention..."
        />
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <h4 className="font-black text-xl mb-4 uppercase">Potential Impact</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block font-black mb-2">Population Affected *</label>
            <input
              type="text"
              required
              value={formData.populationAffected}
              onChange={(e) => updateFormData({ populationAffected: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
              placeholder="e.g., 2 million rural farmers in Southeast Asia"
            />
          </div>

          <div>
            <label className="block font-black mb-2">Current Economic/Social Cost *</label>
            <input
              type="text"
              required
              value={formData.economicSocialCost}
              onChange={(e) => updateFormData({ economicSocialCost: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
              placeholder="e.g., $500M in lost productivity annually"
            />
          </div>

          <div>
            <label className="block font-black mb-2">Opportunity if Solved *</label>
            <input
              type="text"
              required
              value={formData.opportunityIfSolved}
              onChange={(e) => updateFormData({ opportunityIfSolved: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
              placeholder="e.g., 30% increase in household income"
            />
          </div>

          <div>
            <label className="block font-black mb-2">Strategic Importance for Your Organization *</label>
            <textarea
              required
              value={formData.strategicImportance}
              onChange={(e) => updateFormData({ strategicImportance: e.target.value })}
              rows={3}
              className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
              placeholder="Why is solving this critical to your mission?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2Context({ formData, updateFormData, addArrayItem, removeArrayItem, updateArrayItem }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#00D9C0] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">2️⃣ Contextual Background</h3>
        <p className="font-bold">Help teams understand the context and history of this problem.</p>
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Problem Genesis and Evolution *
        </label>
        <textarea
          required
          value={formData.problemGenesis}
          onChange={(e) => updateFormData({ problemGenesis: e.target.value })}
          rows={5}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="How did this problem emerge? What systemic factors perpetuate it?"
        />
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Theoretical Framework
        </label>
        <textarea
          value={formData.theoreticalFramework}
          onChange={(e) => updateFormData({ theoreticalFramework: e.target.value })}
          rows={3}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="Are there academic theories or frameworks that help understand this problem?"
        />
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-xl uppercase">Previous Resolution Attempts</h4>
          <button
            type="button"
            onClick={() => addArrayItem('previousAttempts', { initiative: '', period: '', outcome: '', learnings: '', budget: '' })}
            className="bg-[#00D9C0] px-4 py-2 border-4 border-black font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            + Add
          </button>
        </div>
        
        {formData.previousAttempts.map((attempt: any, index: number) => (
          <div key={index} className="bg-white border-4 border-black p-4 mb-4">
            <div className="flex justify-between mb-3">
              <span className="font-black">Attempt {index + 1}</span>
              {formData.previousAttempts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('previousAttempts', index)}
                  className="text-red-600 font-black hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={attempt.initiative}
                onChange={(e) => updateArrayItem('previousAttempts', index, { initiative: e.target.value })}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Initiative name"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={attempt.period}
                  onChange={(e) => updateArrayItem('previousAttempts', index, { period: e.target.value })}
                  className="border-2 border-black px-3 py-2 font-bold"
                  placeholder="Period"
                />
                <input
                  type="text"
                  value={attempt.budget}
                  onChange={(e) => updateArrayItem('previousAttempts', index, { budget: e.target.value })}
                  className="border-2 border-black px-3 py-2 font-bold"
                  placeholder="Budget range"
                />
              </div>
              <textarea
                value={attempt.outcome}
                onChange={(e) => updateArrayItem('previousAttempts', index, { outcome: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Outcome"
              />
              <textarea
                value={attempt.learnings}
                onChange={(e) => updateArrayItem('previousAttempts', index, { learnings: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Key learnings"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-xl uppercase">Stakeholder Ecosystem</h4>
          <button
            type="button"
            onClick={() => addArrayItem('stakeholders', { name: '', role: '', interests: '', constraints: '', authority: '' })}
            className="bg-[#00D9C0] px-4 py-2 border-4 border-black font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            + Add
          </button>
        </div>
        
        {formData.stakeholders.map((stakeholder: any, index: number) => (
          <div key={index} className="bg-white border-4 border-black p-4 mb-4">
            <div className="flex justify-between mb-3">
              <span className="font-black">Stakeholder {index + 1}</span>
              {formData.stakeholders.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('stakeholders', index)}
                  className="text-red-600 font-black hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={stakeholder.name}
                onChange={(e) => updateArrayItem('stakeholders', index, { name: e.target.value })}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Stakeholder name"
              />
              <input
                type="text"
                value={stakeholder.role}
                onChange={(e) => updateArrayItem('stakeholders', index, { role: e.target.value })}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Role in system"
              />
              <textarea
                value={stakeholder.interests}
                onChange={(e) => updateArrayItem('stakeholders', index, { interests: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Core interests"
              />
              <textarea
                value={stakeholder.constraints}
                onChange={(e) => updateArrayItem('stakeholders', index, { constraints: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Key constraints"
              />
              <select
                value={stakeholder.authority}
                onChange={(e) => updateArrayItem('stakeholders', index, { authority: e.target.value })}
                className="w-full border-2 border-black px-3 py-2 font-bold"
              >
                <option value="">Decision authority...</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step3DeepDive({ formData, updateFormData, addArrayItem, removeArrayItem, updateArrayItem }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#FF6B9D] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">3️⃣ Problem Deep Dive</h3>
        <p className="font-bold">Provide concrete examples and available data to support teams.</p>
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-xl uppercase">Case Studies *</h4>
          <button
            type="button"
            onClick={() => addArrayItem('caseStudies', { context: '', impact: '', evidence: '', story: '' })}
            className="bg-[#FF6B9D] px-4 py-2 border-4 border-black font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            + Add
          </button>
        </div>
        <p className="font-bold mb-4">Provide at least 2 specific, documented examples</p>
        
        {formData.caseStudies.map((caseStudy: any, index: number) => (
          <div key={index} className="bg-white border-4 border-black p-4 mb-4">
            <div className="flex justify-between mb-3">
              <span className="font-black">Case Study {index + 1}</span>
              {formData.caseStudies.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('caseStudies', index)}
                  className="text-red-600 font-black hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-3">
              <textarea
                required
                value={caseStudy.context}
                onChange={(e) => updateArrayItem('caseStudies', index, { context: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Context and location"
              />
              <textarea
                required
                value={caseStudy.impact}
                onChange={(e) => updateArrayItem('caseStudies', index, { impact: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Quantified impact"
              />
              <textarea
                value={caseStudy.evidence}
                onChange={(e) => updateArrayItem('caseStudies', index, { evidence: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Supporting evidence/documentation"
              />
              <textarea
                value={caseStudy.story}
                onChange={(e) => updateArrayItem('caseStudies', index, { story: e.target.value })}
                rows={3}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Human story (anonymized if needed)"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Data Repository Link
        </label>
        <input
          type="url"
          value={formData.dataRepositoryLink}
          onChange={(e) => updateFormData({ dataRepositoryLink: e.target.value })}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="https://..."
        />
        <p className="text-sm font-bold mt-1 opacity-70">Secure link to datasets, research, and documentation</p>
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Regulatory/Legal Framework
        </label>
        <textarea
          value={formData.regulatoryFramework}
          onChange={(e) => updateFormData({ regulatoryFramework: e.target.value })}
          rows={3}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="Relevant legislation, compliance requirements, jurisdictional considerations..."
        />
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Resource Limitations
        </label>
        <textarea
          value={formData.resourceLimitations}
          onChange={(e) => updateFormData({ resourceLimitations: e.target.value })}
          rows={3}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="Budget constraints, available infrastructure, human resource capacity..."
        />
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Cultural/Political Sensitivities
        </label>
        <textarea
          value={formData.culturalSensitivities}
          onChange={(e) => updateFormData({ culturalSensitivities: e.target.value })}
          rows={3}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="Important cultural or political considerations any solution must address..."
        />
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Technical Infrastructure Reality
        </label>
        <textarea
          value={formData.technicalInfrastructure}
          onChange={(e) => updateFormData({ technicalInfrastructure: e.target.value })}
          rows={3}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="Connectivity levels, device availability, digital literacy..."
        />
      </div>
    </div>
  );
}

function Step4Pathways({ formData, updateFormData, addArrayItem, removeArrayItem, updateArrayItem }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#C996FF] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">4️⃣ Solution Pathways</h3>
        <p className="font-bold">Propose 3-5 distinct approaches teams could explore. These will be transformed into product briefs.</p>
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-xl uppercase">Proposed Pathways</h4>
          {formData.pathways.length < 5 && (
            <button
              type="button"
              onClick={() => addArrayItem('pathways', { 
                name: '', hypothesis: '', mechanism: '', beneficiaries: '', 
                beneficiariesCount: '', readinessLevel: '', barriers: '', 
                uncertainties: '', analogousSolutions: '', resourcesRequired: '' 
              })}
              className="bg-[#C996FF] px-4 py-2 border-4 border-black font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              + Add Pathway
            </button>
          )}
        </div>
        
        {formData.pathways.map((pathway: any, index: number) => (
          <div key={index} className="bg-white border-4 border-black p-6 mb-6">
            <div className="flex justify-between mb-4">
              <span className="font-black text-xl">Pathway {index + 1}</span>
              {formData.pathways.length > 3 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('pathways', index)}
                  className="text-red-600 font-black hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-black mb-2">Pathway Name *</label>
                <input
                  type="text"
                  required
                  value={pathway.name}
                  onChange={(e) => updateArrayItem('pathways', index, { name: e.target.value })}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="Descriptive name for this approach"
                />
              </div>
              <div>
                <label className="block font-black mb-2">Core Hypothesis *</label>
                <textarea
                  required
                  value={pathway.hypothesis}
                  onChange={(e) => updateArrayItem('pathways', index, { hypothesis: e.target.value })}
                  rows={2}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="What is the fundamental assumption behind this approach?"
                />
              </div>
              <div>
                <label className="block font-black mb-2">Mechanism of Change *</label>
                <textarea
                  required
                  value={pathway.mechanism}
                  onChange={(e) => updateArrayItem('pathways', index, { mechanism: e.target.value })}
                  rows={3}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="How would this create the desired impact?"
                />
              </div>
              <div>
                <label className="block font-black mb-2">Primary Beneficiaries</label>
                <textarea
                  value={pathway.beneficiaries}
                  onChange={(e) => updateArrayItem('pathways', index, { beneficiaries: e.target.value })}
                  rows={2}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="Who specifically would be the first adopters?"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black mb-2">Estimated Number</label>
                  <input
                    type="text"
                    value={pathway.beneficiariesCount}
                    onChange={(e) => updateArrayItem('pathways', index, { beneficiariesCount: e.target.value })}
                    className="w-full border-2 border-black px-3 py-2 font-bold"
                    placeholder="e.g., 10,000"
                  />
                </div>
                <div>
                  <label className="block font-black mb-2">Readiness Level</label>
                  <select
                    value={pathway.readinessLevel}
                    onChange={(e) => updateArrayItem('pathways', index, { readinessLevel: e.target.value })}
                    className="w-full border-2 border-black px-3 py-2 font-bold"
                  >
                    <option value="">Select...</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-black mb-2">Implementation Barriers</label>
                <textarea
                  value={pathway.barriers}
                  onChange={(e) => updateArrayItem('pathways', index, { barriers: e.target.value })}
                  rows={2}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="Why hasn't this been tried or succeeded yet?"
                />
              </div>
              <div>
                <label className="block font-black mb-2">Critical Uncertainties</label>
                <textarea
                  value={pathway.uncertainties}
                  onChange={(e) => updateArrayItem('pathways', index, { uncertainties: e.target.value })}
                  rows={2}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="What key questions must be answered?"
                />
              </div>
              <div>
                <label className="block font-black mb-2">Analogous Solutions</label>
                <textarea
                  value={pathway.analogousSolutions}
                  onChange={(e) => updateArrayItem('pathways', index, { analogousSolutions: e.target.value })}
                  rows={2}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="Similar approaches in other sectors/geographies we can learn from"
                />
              </div>
              <div>
                <label className="block font-black mb-2">Resources Required</label>
                <textarea
                  value={pathway.resourcesRequired}
                  onChange={(e) => updateArrayItem('pathways', index, { resourcesRequired: e.target.value })}
                  rows={2}
                  className="w-full border-2 border-black px-3 py-2 font-bold"
                  placeholder="What special access, data, or expertise would teams need?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="font-black text-xl uppercase text-red-600">Known Dead Ends</h4>
            <p className="font-bold">CRITICAL: List approaches that seem obvious but have proven ineffective</p>
          </div>
          <button
            type="button"
            onClick={() => addArrayItem('deadEnds', { approach: '', promising: '', failed: '', evidence: '' })}
            className="bg-red-200 px-4 py-2 border-4 border-black font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            + Add
          </button>
        </div>
        
        {formData.deadEnds.map((deadEnd: any, index: number) => (
          <div key={index} className="bg-white border-4 border-black p-4 mb-4">
            <div className="flex justify-between mb-3">
              <span className="font-black">Failed Approach {index + 1}</span>
              {formData.deadEnds.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('deadEnds', index)}
                  className="text-red-600 font-black hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-3">
              <textarea
                value={deadEnd.approach}
                onChange={(e) => updateArrayItem('deadEnds', index, { approach: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="What was tried"
              />
              <textarea
                value={deadEnd.promising}
                onChange={(e) => updateArrayItem('deadEnds', index, { promising: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Why it seemed promising"
              />
              <textarea
                value={deadEnd.failed}
                onChange={(e) => updateArrayItem('deadEnds', index, { failed: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Why it failed"
              />
              <textarea
                value={deadEnd.evidence}
                onChange={(e) => updateArrayItem('deadEnds', index, { evidence: e.target.value })}
                rows={2}
                className="w-full border-2 border-black px-3 py-2 font-bold"
                placeholder="Evidence/documentation"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step5Validation({ formData, updateFormData, addArrayItem, removeArrayItem, updateArrayItem }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#6BCF7F] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">5️⃣ Validation Framework</h3>
        <p className="font-bold">Define how success will be measured at different time horizons.</p>
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-lg uppercase">Immediate Indicators (Weekend)</h4>
          <button
            type="button"
            onClick={() => addArrayItem('immediateMetrics', { metric: '', target: '', method: '' })}
            className="bg-[#6BCF7F] px-3 py-1 border-2 border-black font-black text-xs uppercase"
          >
            + Add
          </button>
        </div>
        {formData.immediateMetrics.map((metric: any, index: number) => (
          <div key={index} className="bg-white border-2 border-black p-3 mb-3">
            <div className="flex justify-between mb-2">
              <span className="font-black text-sm">Metric {index + 1}</span>
              {formData.immediateMetrics.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('immediateMetrics', index)}
                  className="text-red-600 font-black text-xs hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={metric.metric}
                onChange={(e) => updateArrayItem('immediateMetrics', index, { metric: e.target.value })}
                className="w-full border-2 border-black px-2 py-1 font-bold text-sm"
                placeholder="Metric"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={metric.target}
                  onChange={(e) => updateArrayItem('immediateMetrics', index, { target: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Target"
                />
                <input
                  type="text"
                  value={metric.method}
                  onChange={(e) => updateArrayItem('immediateMetrics', index, { method: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Measurement method"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-lg uppercase">Short-term (1-3 months)</h4>
          <button
            type="button"
            onClick={() => addArrayItem('shortTermMetrics', { metric: '', target: '', method: '' })}
            className="bg-[#FFD93D] px-3 py-1 border-2 border-black font-black text-xs uppercase"
          >
            + Add
          </button>
        </div>
        {formData.shortTermMetrics.map((metric: any, index: number) => (
          <div key={index} className="bg-white border-2 border-black p-3 mb-3">
            <div className="flex justify-between mb-2">
              <span className="font-black text-sm">Metric {index + 1}</span>
              {formData.shortTermMetrics.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('shortTermMetrics', index)}
                  className="text-red-600 font-black text-xs hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={metric.metric}
                onChange={(e) => updateArrayItem('shortTermMetrics', index, { metric: e.target.value })}
                className="w-full border-2 border-black px-2 py-1 font-bold text-sm"
                placeholder="Metric"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={metric.target}
                  onChange={(e) => updateArrayItem('shortTermMetrics', index, { target: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Target"
                />
                <input
                  type="text"
                  value={metric.method}
                  onChange={(e) => updateArrayItem('shortTermMetrics', index, { method: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Measurement method"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-lg uppercase">Medium-term (6-12 months)</h4>
          <button
            type="button"
            onClick={() => addArrayItem('mediumTermMetrics', { metric: '', target: '', method: '' })}
            className="bg-[#FF6B9D] px-3 py-1 border-2 border-black font-black text-xs uppercase"
          >
            + Add
          </button>
        </div>
        {formData.mediumTermMetrics.map((metric: any, index: number) => (
          <div key={index} className="bg-white border-2 border-black p-3 mb-3">
            <div className="flex justify-between mb-2">
              <span className="font-black text-sm">Metric {index + 1}</span>
              {formData.mediumTermMetrics.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('mediumTermMetrics', index)}
                  className="text-red-600 font-black text-xs hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={metric.metric}
                onChange={(e) => updateArrayItem('mediumTermMetrics', index, { metric: e.target.value })}
                className="w-full border-2 border-black px-2 py-1 font-bold text-sm"
                placeholder="Metric"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={metric.target}
                  onChange={(e) => updateArrayItem('mediumTermMetrics', index, { target: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Target"
                />
                <input
                  type="text"
                  value={metric.method}
                  onChange={(e) => updateArrayItem('mediumTermMetrics', index, { method: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Measurement method"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-lg uppercase">Long-term (2+ years)</h4>
          <button
            type="button"
            onClick={() => addArrayItem('longTermMetrics', { metric: '', target: '', method: '' })}
            className="bg-[#C996FF] px-3 py-1 border-2 border-black font-black text-xs uppercase"
          >
            + Add
          </button>
        </div>
        {formData.longTermMetrics.map((metric: any, index: number) => (
          <div key={index} className="bg-white border-2 border-black p-3 mb-3">
            <div className="flex justify-between mb-2">
              <span className="font-black text-sm">Metric {index + 1}</span>
              {formData.longTermMetrics.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('longTermMetrics', index)}
                  className="text-red-600 font-black text-xs hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={metric.metric}
                onChange={(e) => updateArrayItem('longTermMetrics', index, { metric: e.target.value })}
                className="w-full border-2 border-black px-2 py-1 font-bold text-sm"
                placeholder="Metric"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={metric.target}
                  onChange={(e) => updateArrayItem('longTermMetrics', index, { target: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Target"
                />
                <input
                  type="text"
                  value={metric.method}
                  onChange={(e) => updateArrayItem('longTermMetrics', index, { method: e.target.value })}
                  className="border-2 border-black px-2 py-1 font-bold text-sm"
                  placeholder="Measurement method"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Adoption Barriers Analysis
        </label>
        <textarea
          value={formData.adoptionBarriers}
          onChange={(e) => updateFormData({ adoptionBarriers: e.target.value })}
          rows={5}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="Behavioral change required, economic barriers, technical barriers, organizational barriers, trust/credibility barriers..."
        />
      </div>
    </div>
  );
}

function Step6Resources({ formData, updateFormData }: any) {
  const dataOptions = [
    'Full dataset access',
    'Anonymized user research',
    'Technical documentation',
    'Historical project reports',
    'Contact database'
  ];

  const expertOptions = [
    'Subject matter experts',
    'Field practitioners',
    'Beneficiary representatives',
    'Technical specialists'
  ];

  const testingOptions = [
    'Access to pilot communities',
    'Testing environments',
    'Feedback mechanisms',
    'Validation protocols'
  ];

  const commitmentOptions = [
    'Pilot program',
    'Letter of intent for adoption',
    'Introduction to funding partners',
    'Joint grant application',
    'Full deployment in our operations',
    'Academic paper co-authorship',
    'Media coverage and advocacy'
  ];

  const toggleArrayItem = (field: keyof ChallengeFormData, value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      updateFormData({ [field]: current.filter(item => item !== value) });
    } else {
      updateFormData({ [field]: [...current, value] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#00D9C0] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">6️⃣ Resources and Commitment</h3>
        <p className="font-bold">What support can you provide to teams? What are you committed to after the event?</p>
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <h4 className="font-black text-xl mb-4 uppercase">What We Provide</h4>
        
        <div className="mb-6">
          <label className="block font-black mb-3">Data and Documentation</label>
          <div className="space-y-2">
            {dataOptions.map(option => (
              <label key={option} className="flex items-center gap-3 p-2 bg-white border-2 border-black cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.dataProvided.includes(option)}
                  onChange={() => toggleArrayItem('dataProvided', option)}
                  className="w-5 h-5 border-2 border-black"
                />
                <span className="font-bold">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-black mb-3">Expert Support</label>
          <div className="space-y-2">
            {expertOptions.map(option => (
              <label key={option} className="flex items-center gap-3 p-2 bg-white border-2 border-black cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.expertSupport.includes(option)}
                  onChange={() => toggleArrayItem('expertSupport', option)}
                  className="w-5 h-5 border-2 border-black"
                />
                <span className="font-bold">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-black mb-3">Testing Infrastructure</label>
          <div className="space-y-2">
            {testingOptions.map(option => (
              <label key={option} className="flex items-center gap-3 p-2 bg-white border-2 border-black cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.testingInfrastructure.includes(option)}
                  onChange={() => toggleArrayItem('testingInfrastructure', option)}
                  className="w-5 h-5 border-2 border-black"
                />
                <span className="font-bold">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <h4 className="font-black text-xl mb-4 uppercase">Lead Expert *</h4>
        <div className="space-y-4">
          <input
            type="text"
            required
            value={formData.leadExpertName}
            onChange={(e) => updateFormData({ leadExpertName: e.target.value })}
            className="w-full border-4 border-black px-4 py-3 font-bold"
            placeholder="Name and Title"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              required
              value={formData.leadExpertEmail}
              onChange={(e) => updateFormData({ leadExpertEmail: e.target.value })}
              className="border-4 border-black px-4 py-3 font-bold"
              placeholder="Email"
            />
            <input
              type="tel"
              value={formData.leadExpertMobile}
              onChange={(e) => updateFormData({ leadExpertMobile: e.target.value })}
              className="border-4 border-black px-4 py-3 font-bold"
              placeholder="Mobile (WhatsApp)"
            />
          </div>
          <textarea
            value={formData.leadExpertBio}
            onChange={(e) => updateFormData({ leadExpertBio: e.target.value })}
            rows={2}
            className="w-full border-4 border-black px-4 py-3 font-bold"
            placeholder="Brief bio (2 lines)"
          />
        </div>
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <h4 className="font-black text-xl mb-4 uppercase">Event Availability</h4>
        <div className="space-y-4">
          <div>
            <label className="block font-black mb-2">Friday Evening Briefing</label>
            <select
              value={formData.fridayAvailability}
              onChange={(e) => updateFormData({ fridayAvailability: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-bold"
            >
              <option value="">Select...</option>
              <option value="In-person">In-person</option>
              <option value="Virtual">Virtual</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-black mb-2">Saturday Hours</label>
              <input
                type="text"
                value={formData.saturdayHours}
                onChange={(e) => updateFormData({ saturdayHours: e.target.value })}
                className="w-full border-4 border-black px-4 py-3 font-bold"
                placeholder="e.g., 10am-4pm"
              />
            </div>
            <div>
              <label className="block font-black mb-2">Sunday Hours</label>
              <input
                type="text"
                value={formData.sundayHours}
                onChange={(e) => updateFormData({ sundayHours: e.target.value })}
                className="w-full border-4 border-black px-4 py-3 font-bold"
                placeholder="e.g., 10am-2pm"
              />
            </div>
          </div>
          <div>
            <label className="block font-black mb-2">Preferred Communication During Event</label>
            <input
              type="text"
              value={formData.preferredCommunication}
              onChange={(e) => updateFormData({ preferredCommunication: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-bold"
              placeholder="Email, WhatsApp, Slack, etc."
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-4 border-black p-6">
        <h4 className="font-black text-xl mb-4 uppercase">Post-Event Commitment</h4>
        <p className="font-bold mb-4">Select all that apply to successful solutions:</p>
        <div className="space-y-2">
          {commitmentOptions.map(option => (
            <label key={option} className="flex items-center gap-3 p-2 bg-white border-2 border-black cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.postEventCommitment.includes(option)}
                onChange={() => toggleArrayItem('postEventCommitment', option)}
                className="w-5 h-5 border-2 border-black"
              />
              <span className="font-bold">{option}</span>
            </label>
          ))}
        </div>
        {formData.postEventCommitment.includes('Pilot program') && (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-black mb-2">Pilot Timeline</label>
              <input
                type="text"
                value={formData.pilotTimeline}
                onChange={(e) => updateFormData({ pilotTimeline: e.target.value })}
                className="w-full border-4 border-black px-4 py-3 font-bold"
                placeholder="e.g., Q2 2025"
              />
            </div>
            <div>
              <label className="block font-black mb-2">Budget Range</label>
              <input
                type="text"
                value={formData.pilotBudget}
                onChange={(e) => updateFormData({ pilotBudget: e.target.value })}
                className="w-full border-4 border-black px-4 py-3 font-bold"
                placeholder="e.g., $50k-$100k"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Step7Strategic({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#FFD93D] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">7️⃣ Strategic Context</h3>
        <p className="font-bold">Help teams understand the bigger picture and your motivation.</p>
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Why This, Why Now? *
        </label>
        <textarea
          required
          value={formData.whyNow}
          onChange={(e) => updateFormData({ whyNow: e.target.value })}
          rows={5}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="What makes this challenge particularly timely and critical?"
        />
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Alignment with Global Agendas
        </label>
        <textarea
          value={formData.globalAlignment}
          onChange={(e) => updateFormData({ globalAlignment: e.target.value })}
          rows={4}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="How does this connect to SDGs, climate goals, or other frameworks?"
        />
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Your Organization's Unique Position *
        </label>
        <textarea
          required
          value={formData.uniquePosition}
          onChange={(e) => updateFormData({ uniquePosition: e.target.value })}
          rows={4}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="Why are you best placed to shepherd this solution?"
        />
      </div>

      <div>
        <label className="block text-lg font-black mb-2 uppercase">
          Message to Innovators *
        </label>
        <textarea
          required
          value={formData.messageToInnovators}
          onChange={(e) => updateFormData({ messageToInnovators: e.target.value })}
          rows={5}
          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
          placeholder="What would you tell the teams working on your challenge?"
        />
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <h4 className="font-black text-xl mb-4 uppercase">Administrative Information</h4>
        <div className="space-y-4">
          <input
            type="text"
            required
            value={formData.primaryContact}
            onChange={(e) => updateFormData({ primaryContact: e.target.value })}
            className="w-full border-4 border-black px-4 py-3 font-bold"
            placeholder="Primary Contact Name *"
          />
          <input
            type="text"
            required
            value={formData.institution}
            onChange={(e) => updateFormData({ institution: e.target.value })}
            className="w-full border-4 border-black px-4 py-3 font-bold"
            placeholder="Institution/Organization *"
          />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full border-4 border-black px-4 py-3 font-bold"
            placeholder="Email *"
          />
          <input
            type="text"
            value={formData.alternativeContact}
            onChange={(e) => updateFormData({ alternativeContact: e.target.value })}
            className="w-full border-4 border-black px-4 py-3 font-bold"
            placeholder="Alternative Contact"
          />
        </div>
      </div>
    </div>
  );
}

function Step8Review({ formData }: { formData: ChallengeFormData }) {
  const completionChecks = [
    { label: 'Executive summary provided', check: !!formData.executiveSummary },
    { label: 'At least 2 case studies documented', check: formData.caseStudies.filter(c => c.context).length >= 2 },
    { label: 'At least 3 solution pathways defined', check: formData.pathways.filter(p => p.name).length >= 3 },
    { label: 'Success metrics defined', check: formData.immediateMetrics.length > 0 },
    { label: 'Lead expert designated', check: !!formData.leadExpertName && !!formData.leadExpertEmail },
    { label: 'Post-event commitment specified', check: formData.postEventCommitment.length > 0 },
    { label: 'Administrative information complete', check: !!formData.primaryContact && !!formData.institution && !!formData.email }
  ];

  const completionPercentage = Math.round((completionChecks.filter(c => c.check).length / completionChecks.length) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-[#00D9C0] border-4 border-black p-6 mb-6">
        <h3 className="text-2xl font-black mb-2">8️⃣ Review & Submit</h3>
        <p className="font-bold">Review your submission before sending.</p>
      </div>

      <div className="bg-white border-4 border-black p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-black text-xl uppercase">Completion Status</h4>
          <div className="text-3xl font-black">{completionPercentage}%</div>
        </div>
        <div className="h-6 bg-gray-200 border-4 border-black mb-4">
          <div 
            className="h-full bg-[#00D9C0]" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="space-y-2">
          {completionChecks.map((check, index) => (
            <div key={index} className="flex items-center gap-3 p-2">
              {check.check ? (
                <CheckCircle className="text-green-600" size={20} strokeWidth={3} />
              ) : (
                <Circle className="text-gray-400" size={20} strokeWidth={3} />
              )}
              <span className={`font-bold ${check.check ? 'text-black' : 'text-gray-500'}`}>
                {check.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border-4 border-black p-6">
        <h4 className="font-black text-xl mb-4 uppercase">Challenge Summary</h4>
        <div className="space-y-3">
          <div>
            <span className="font-black">Title:</span>
            <p className="font-bold">{formData.challengeTitle || '(Not provided)'}</p>
          </div>
          <div>
            <span className="font-black">Summary:</span>
            <p className="font-bold">{formData.executiveSummary || '(Not provided)'}</p>
          </div>
          <div>
            <span className="font-black">Lead Expert:</span>
            <p className="font-bold">{formData.leadExpertName || '(Not provided)'} ({formData.leadExpertEmail})</p>
          </div>
          <div>
            <span className="font-black">Solution Pathways:</span>
            <p className="font-bold">{formData.pathways.filter(p => p.name).length} pathways defined</p>
          </div>
          <div>
            <span className="font-black">Post-Event Commitment:</span>
            <p className="font-bold">{formData.postEventCommitment.join(', ') || '(Not specified)'}</p>
          </div>
        </div>
      </div>

      {completionPercentage < 70 && (
        <div className="bg-yellow-50 border-4 border-black p-6">
          <h4 className="font-black text-lg text-yellow-800 mb-2">⚠️ Incomplete Submission</h4>
          <p className="font-bold">Your submission is less than 70% complete. While you can submit now, providing more detail will help teams create better solutions. Consider going back to complete missing sections.</p>
        </div>
      )}

      <div className="bg-blue-50 border-4 border-black p-6">
        <h4 className="font-black text-lg mb-2">📧 What Happens Next?</h4>
        <div className="space-y-2 font-bold">
          <p>1. Your submission will be sent via email to our team</p>
          <p>2. We'll review and contact you within 3 business days</p>
          <p>3. We'll work with you to refine the challenge into actionable product briefs</p>
          <p>4. Your challenge will be featured at Hack the Gap 2025!</p>
        </div>
      </div>
    </div>
  );
}

