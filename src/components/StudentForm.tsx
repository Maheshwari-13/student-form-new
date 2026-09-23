import React, { useState, useEffect } from 'react';
import { StudentRegistration, FormStep, FormErrors, DegreeLevel } from '../types';
import { DEPARTMENTS, BLOOD_GROUPS, ACTIVITIES, TRANSPORT_ROUTES } from '../data/departments';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, Building2, 
  CheckCircle2, AlertCircle, Upload, ArrowRight, ArrowLeft,
  Sparkles, RefreshCw, Trash2, Camera
} from 'lucide-react';

interface StudentFormProps {
  onStudentSubmit: (student: StudentRegistration) => void;
  onLiveChange: (data: Partial<StudentRegistration>) => void;
  onFillDemo: () => void;
  liveData: Partial<StudentRegistration>;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  onStudentSubmit,
  onLiveChange,
  onFillDemo,
  liveData
}) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<Partial<StudentRegistration>>({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'O+',
    nationality: 'American',
    nationalId: '',
    photoUrl: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    emergencyName: '',
    emergencyRelation: 'Parent',
    emergencyPhone: '',
    degreeLevel: 'undergraduate',
    program: 'B.Tech Computer Science',
    academicTerm: 'Fall 2026',
    previousSchool: '',
    passingYear: '2025',
    qualifyingScore: '',
    scoreType: 'percentage',
    hostelNeeded: false,
    hostelRoomType: 'Twin Sharing (AC)',
    transportNeeded: false,
    transportRoute: TRANSPORT_ROUTES[0],
    activities: ['Robotics & AI Innovation Lab', 'Coding & Competitive Programming Club'],
    scholarshipCandidate: false,
    declarationAgreed: false,
    digitalSignature: '',
    signatureDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [saveStatus, setSaveStatus] = useState<string>('Autosaved to local draft');

  // Sync external liveData updates (e.g. from "Fill Sample Data")
  useEffect(() => {
    if (liveData && Object.keys(liveData).length > 0) {
      setFormData(prev => ({ ...prev, ...liveData }));
    }
  }, [liveData]);

  // Autosave draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('student_form_draft', JSON.stringify(formData));
      setSaveStatus('Draft saved');
      const timer = setTimeout(() => setSaveStatus(''), 2500);
      return () => clearTimeout(timer);
    } catch {
      // ignore storage errors
    }
  }, [formData]);

  const updateField = (field: keyof StudentRegistration, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onLiveChange(updated);
    
    // Clear field error when modified
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string): boolean => {
    let err = '';
    const val = (formData as any)[field];

    switch (field) {
      case 'firstName':
        if (!val || val.trim().length < 2) err = 'First name must be at least 2 characters';
        break;
      case 'lastName':
        if (!val || val.trim().length < 2) err = 'Last name must be at least 2 characters';
        break;
      case 'dob':
        if (!val) {
          err = 'Date of birth is required';
        } else {
          const birth = new Date(val);
          const ageDiff = Date.now() - birth.getTime();
          const ageDate = new Date(ageDiff);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          if (age < 15 || age > 75) {
            err = 'Applicant age must be between 15 and 75 years';
          }
        }
        break;
      case 'email':
        if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          err = 'Please provide a valid email address (e.g. student@example.com)';
        }
        break;
      case 'phone':
        if (!val || val.trim().length < 7) {
          err = 'Please provide a valid phone number (at least 7 digits)';
        }
        break;
      case 'address':
        if (!val || val.trim().length < 5) err = 'Please enter a complete residential address';
        break;
      case 'city':
        if (!val || val.trim().length < 2) err = 'City is required';
        break;
      case 'postalCode':
        if (!val || val.trim().length < 3) err = 'Postal/ZIP code is required';
        break;
      case 'emergencyName':
        if (!val || val.trim().length < 2) err = 'Emergency contact person name is required';
        break;
      case 'emergencyPhone':
        if (!val || val.trim().length < 7) err = 'Emergency contact phone is required';
        break;
      case 'previousSchool':
        if (!val || val.trim().length < 3) err = 'Previous school or university name is required';
        break;
      case 'qualifyingScore':
        if (!val) {
          err = 'Qualifying GPA or percentage score is required';
        } else {
          const num = parseFloat(val);
          if (isNaN(num) || num <= 0) {
            err = 'Score must be a positive numeric value';
          } else if (formData.scoreType === 'percentage' && num > 100) {
            err = 'Percentage score cannot exceed 100%';
          } else if (formData.scoreType === 'gpa' && num > 10) {
            err = 'GPA cannot exceed 10.0 scale';
          }
        }
        break;
      case 'declarationAgreed':
        if (!formData.declarationAgreed) err = 'You must accept the honor code and statements';
        break;
      case 'digitalSignature':
        if (!val || val.trim().length < 3) err = 'Please enter your legal name as digital signature';
        break;
      default:
        break;
    }

    if (err) {
      setErrors(prev => ({ ...prev, [field]: err }));
      return false;
    } else {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
      return true;
    }
  };

  const validateStep = (step: FormStep): boolean => {
    const stepErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName || formData.firstName.trim().length < 2) stepErrors.firstName = 'First name is required';
      if (!formData.lastName || formData.lastName.trim().length < 2) stepErrors.lastName = 'Last name is required';
      if (!formData.dob) {
        stepErrors.dob = 'Date of birth is required';
      } else {
        const birth = new Date(formData.dob);
        const age = Math.abs(new Date(Date.now() - birth.getTime()).getUTCFullYear() - 1970);
        if (age < 15) stepErrors.dob = 'Applicant must be at least 15 years old';
      }
    } else if (step === 2) {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) stepErrors.email = 'Valid email is required';
      if (!formData.phone || formData.phone.trim().length < 7) stepErrors.phone = 'Valid phone number is required';
      if (!formData.address || formData.address.trim().length < 4) stepErrors.address = 'Street address is required';
      if (!formData.city) stepErrors.city = 'City is required';
      if (!formData.postalCode) stepErrors.postalCode = 'Postal code is required';
      if (!formData.emergencyName) stepErrors.emergencyName = 'Emergency contact name is required';
      if (!formData.emergencyPhone) stepErrors.emergencyPhone = 'Emergency contact phone is required';
    } else if (step === 3) {
      if (!formData.program) stepErrors.program = 'Academic program is required';
      if (!formData.previousSchool) stepErrors.previousSchool = 'Previous institution is required';
      if (!formData.qualifyingScore) {
        stepErrors.qualifyingScore = 'Qualifying score is required';
      } else {
        const num = parseFloat(formData.qualifyingScore);
        if (isNaN(num) || num <= 0) stepErrors.qualifyingScore = 'Valid score required';
      }
    } else if (step === 5) {
      if (!formData.declarationAgreed) stepErrors.declarationAgreed = 'You must accept the academic declaration';
      if (!formData.digitalSignature || formData.digitalSignature.trim().length < 3) {
        stepErrors.digitalSignature = 'Digital signature is required';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep((prev) => (prev + 1) as FormStep);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(5)) {
      setCurrentStep(5);
      return;
    }

    const regId = 'REG-2026-' + Math.floor(1000 + Math.random() * 9000);
    const completeStudent: StudentRegistration = {
      id: regId,
      createdAt: new Date().toISOString(),
      status: 'Pending Review',
      firstName: formData.firstName || '',
      middleName: formData.middleName,
      lastName: formData.lastName || '',
      dob: formData.dob || '2005-01-01',
      gender: formData.gender || 'Male',
      bloodGroup: formData.bloodGroup || 'O+',
      nationality: formData.nationality || 'General',
      nationalId: formData.nationalId || `NAT-${Math.floor(100000 + Math.random() * 900000)}`,
      photoUrl: formData.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address || '',
      city: formData.city || '',
      state: formData.state || '',
      postalCode: formData.postalCode || '',
      country: formData.country || 'United States',
      emergencyName: formData.emergencyName || '',
      emergencyRelation: formData.emergencyRelation || 'Parent',
      emergencyPhone: formData.emergencyPhone || '',
      degreeLevel: formData.degreeLevel || 'undergraduate',
      program: formData.program || 'B.Tech Computer Science',
      academicTerm: formData.academicTerm || 'Fall 2026',
      previousSchool: formData.previousSchool || '',
      passingYear: formData.passingYear || '2025',
      qualifyingScore: formData.qualifyingScore || '85.0',
      scoreType: formData.scoreType || 'percentage',
      hostelNeeded: !!formData.hostelNeeded,
      hostelRoomType: formData.hostelRoomType,
      transportNeeded: !!formData.transportNeeded,
      transportRoute: formData.transportRoute,
      activities: formData.activities || [],
      scholarshipCandidate: !!formData.scholarshipCandidate,
      declarationAgreed: !!formData.declarationAgreed,
      digitalSignature: formData.digitalSignature || formData.firstName + ' ' + formData.lastName,
      signatureDate: formData.signatureDate || new Date().toISOString().split('T')[0],
    };

    onStudentSubmit(completeStudent);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size exceeds 5MB limit' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleActivityToggle = (act: string) => {
    const list = formData.activities || [];
    if (list.includes(act)) {
      updateField('activities', list.filter(item => item !== act));
    } else {
      updateField('activities', [...list, act]);
    }
  };

  // Steps definition for header
  const stepsConfig = [
    { num: 1, label: 'Personal Details' },
    { num: 2, label: 'Contact & Address' },
    { num: 3, label: 'Academic Profile' },
    { num: 4, label: 'Campus & Electives' },
    { num: 5, label: 'Verification & Submit' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Top Banner & Quick Controls */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Academic Admission & Registration Form
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Session 2026–2027 · Samrat Ashok Technological Institute
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline-block">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={onFillDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            title="Auto-fill with sample applicant data"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Sample Data</span>
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <nav aria-label="Registration Steps" className="px-4 sm:px-6 py-3 bg-slate-100/70 border-b border-slate-200">
        <ol className="flex items-center justify-between gap-1 overflow-x-auto text-xs py-1">
          {stepsConfig.map((s) => {
            const isActive = currentStep === s.num;
            const isDone = currentStep > s.num;
            return (
              <li
                key={s.num}
                onClick={() => {
                  if (isDone || validateStep(currentStep)) {
                    setCurrentStep(s.num as FormStep);
                  }
                }}
                className={`flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap px-2 py-1 rounded ${
                  isActive
                    ? 'text-slate-950 font-bold bg-white shadow-2xs'
                    : isDone
                    ? 'text-emerald-700 font-medium hover:text-emerald-900'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {isDone ? '✓' : s.num}
                </span>
                <span className="hidden md:inline">{s.label}</span>
                <span className="md:hidden">Step {s.num}</span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* The Semantic Form Body */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6" noValidate>
        {/* ================= STEP 1: PERSONAL DETAILS ================= */}
        {currentStep === 1 && (
          <fieldset className="space-y-5 border-none p-0 m-0">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <legend className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-sky-600" />
                <span>1. Personal Information</span>
              </legend>
              <span className="text-xs text-slate-400">Fields marked * are mandatory</span>
            </div>

            {/* Photo Upload Section */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-24 h-28 rounded-lg border-2 border-dashed border-slate-300 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                {formData.photoUrl ? (
                  <img
                    src={formData.photoUrl}
                    alt="Student Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 font-medium block">Passport Photo</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <label className="block text-xs font-semibold text-slate-800">
                  Applicant ID Photo (For Student Card & Academic Docket)
                </label>
                <p className="text-[11px] text-slate-500">
                  Supports JPEG, PNG or WebP up to 5MB. Clear front-facing portrait recommended.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.photoUrl && (
                    <button
                      type="button"
                      onClick={() => updateField('photoUrl', '')}
                      className="px-2.5 py-1.5 rounded-md text-xs text-rose-600 hover:bg-rose-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {errors.photo && <p className="text-xs text-rose-600">{errors.photo}</p>}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-semibold text-slate-700 mb-1">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  placeholder="e.g. Liam"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                    errors.firstName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                  }`}
                  required
                />
                {errors.firstName && <p className="text-xs text-rose-600 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="middleName" className="block text-xs font-semibold text-slate-700 mb-1">
                  Middle Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName || ''}
                  onChange={(e) => updateField('middleName', e.target.value)}
                  placeholder="e.g. Christopher"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-xs font-semibold text-slate-700 mb-1">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  placeholder="e.g. Bennett"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                    errors.lastName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                  }`}
                  required
                />
                {errors.lastName && <p className="text-xs text-rose-600 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* DOB, Gender & Blood Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="dob" className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob || ''}
                  onChange={(e) => updateField('dob', e.target.value)}
                  onBlur={() => handleBlur('dob')}
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                    errors.dob ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                  }`}
                  required
                />
                {errors.dob && <p className="text-xs text-rose-600 mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label htmlFor="gender" className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || 'Male'}
                  onChange={(e) => updateField('gender', e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="bloodGroup" className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Group <span className="text-rose-500">*</span>
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup || 'O+'}
                  onChange={(e) => updateField('bloodGroup', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Nationality & National ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nationality" className="block text-xs font-semibold text-slate-700 mb-1">
                  Nationality / Citizenship
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality || ''}
                  onChange={(e) => updateField('nationality', e.target.value)}
                  placeholder="e.g. United States, Canadian, Indian"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="nationalId" className="block text-xs font-semibold text-slate-700 mb-1">
                  National ID / Passport / Aadhaar Number
                </label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId || ''}
                  onChange={(e) => updateField('nationalId', e.target.value)}
                  placeholder="e.g. ID-492-9104-X"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono text-xs"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* ================= STEP 2: CONTACT & RESIDENCE ================= */}
        {currentStep === 2 && (
          <fieldset className="space-y-5 border-none p-0 m-0">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <legend className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-600" />
                <span>2. Contact Information & Emergency Details</span>
              </legend>
              <span className="text-xs text-slate-400">Official communication channels</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Applicant Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="student.name@domain.edu"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                  }`}
                  required
                />
                {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                    errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                  }`}
                  required
                />
                {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-semibold text-slate-700 mb-1">
                Permanent Street Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows={2}
                value={formData.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                onBlur={() => handleBlur('address')}
                placeholder="House/Apartment number, street name, locality"
                className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                  errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                }`}
                required
              />
              {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label htmlFor="city" className="block text-xs font-semibold text-slate-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city || ''}
                  onChange={(e) => updateField('city', e.target.value)}
                  onBlur={() => handleBlur('city')}
                  placeholder="e.g. Boston"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                    errors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500'
                  }`}
                  required
                />
                {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-xs font-semibold text-slate-700 mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state || ''}
                  onChange={(e) => updateField('state', e.target.value)}
                  placeholder="e.g. MA"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-xs font-semibold text-slate-700 mb-1">
                  Postal / ZIP Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode || ''}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                  onBlur={() => handleBlur('postalCode')}
                  placeholder="e.g. 02138"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none transition-colors ${
                    errors.postalCode ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500'
                  }`}
                  required
                />
                {errors.postalCode && <p className="text-xs text-rose-600 mt-1">{errors.postalCode}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-xs font-semibold text-slate-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country || ''}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="United States"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Emergency Contact Group */}
            <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200/80 space-y-3">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Emergency Contact Person
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="emergencyName" className="block text-xs font-medium text-slate-700 mb-1">
                    Contact Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="emergencyName"
                    name="emergencyName"
                    value={formData.emergencyName || ''}
                    onChange={(e) => updateField('emergencyName', e.target.value)}
                    onBlur={() => handleBlur('emergencyName')}
                    placeholder="e.g. Arthur Bennett"
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                    required
                  />
                  {errors.emergencyName && <p className="text-xs text-rose-600 mt-0.5">{errors.emergencyName}</p>}
                </div>

                <div>
                  <label htmlFor="emergencyRelation" className="block text-xs font-medium text-slate-700 mb-1">
                    Relationship
                  </label>
                  <select
                    id="emergencyRelation"
                    name="emergencyRelation"
                    value={formData.emergencyRelation || 'Parent'}
                    onChange={(e) => updateField('emergencyRelation', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Guardian">Legal Guardian</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="emergencyPhone" className="block text-xs font-medium text-slate-700 mb-1">
                    Emergency Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone || ''}
                    onChange={(e) => updateField('emergencyPhone', e.target.value)}
                    onBlur={() => handleBlur('emergencyPhone')}
                    placeholder="+1 (555) 999-0000"
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                    required
                  />
                  {errors.emergencyPhone && <p className="text-xs text-rose-600 mt-0.5">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>
          </fieldset>
        )}

        {/* ================= STEP 3: ACADEMIC PROFILE ================= */}
        {currentStep === 3 && (
          <fieldset className="space-y-5 border-none p-0 m-0">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <legend className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-600" />
                <span>3. Academic Program & Credentials</span>
              </legend>
              <span className="text-xs text-slate-400">Target curriculum details</span>
            </div>

            {/* Degree Level Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Target Degree Level <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'undergraduate', label: 'Undergraduate', desc: 'B.Tech, B.S., B.Des' },
                  { id: 'postgraduate', label: 'Postgraduate', desc: 'M.Tech, M.S., M.B.A.' },
                  { id: 'diploma', label: 'Diploma / Certificate', desc: 'Specialized 1-2 Year' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => updateField('degreeLevel', lvl.id as DegreeLevel)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      formData.degreeLevel === lvl.id
                        ? 'border-sky-600 bg-sky-50/50 ring-1 ring-sky-600 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-xs font-bold text-slate-900">{lvl.label}</span>
                    <span className="text-[11px] text-slate-500">{lvl.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Academic Program / Major */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="program" className="block text-xs font-semibold text-slate-700 mb-1">
                  Intended Program / Department Major <span className="text-rose-500">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program || ''}
                  onChange={(e) => updateField('program', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  {DEPARTMENTS.map((dept) => (
                    <optgroup key={dept.id} label={dept.name}>
                      {dept.degrees.map((deg) => (
                        <option key={deg} value={deg}>{deg}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="academicTerm" className="block text-xs font-semibold text-slate-700 mb-1">
                  Admission Term / Session <span className="text-rose-500">*</span>
                </label>
                <select
                  id="academicTerm"
                  name="academicTerm"
                  value={formData.academicTerm || 'Fall 2026'}
                  onChange={(e) => updateField('academicTerm', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                >
                  <option value="Fall 2026">Fall 2026 (Begins August 2026)</option>
                  <option value="Spring 2027">Spring 2027 (Begins January 2027)</option>
                  <option value="Summer 2027">Summer 2027 (Intensive Session)</option>
                </select>
              </div>
            </div>

            {/* Prior Education */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="previousSchool" className="block text-xs font-semibold text-slate-700 mb-1">
                  Previous High School / College Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="previousSchool"
                  name="previousSchool"
                  value={formData.previousSchool || ''}
                  onChange={(e) => updateField('previousSchool', e.target.value)}
                  onBlur={() => handleBlur('previousSchool')}
                  placeholder="e.g. St. Xavier Senior Secondary / City College"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none ${
                    errors.previousSchool ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500'
                  }`}
                  required
                />
                {errors.previousSchool && <p className="text-xs text-rose-600 mt-1">{errors.previousSchool}</p>}
              </div>

              <div>
                <label htmlFor="passingYear" className="block text-xs font-semibold text-slate-700 mb-1">
                  Year of Completion
                </label>
                <select
                  id="passingYear"
                  name="passingYear"
                  value={formData.passingYear || '2025'}
                  onChange={(e) => updateField('passingYear', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                >
                  {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Qualifying Score & GPA */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Grading Standard
                </label>
                <div className="flex items-center gap-4 text-xs mt-1.5">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="scoreType"
                      value="percentage"
                      checked={formData.scoreType === 'percentage'}
                      onChange={() => updateField('scoreType', 'percentage')}
                      className="text-sky-600"
                    />
                    <span>Percentage (%) Out of 100</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="scoreType"
                      value="gpa"
                      checked={formData.scoreType === 'gpa'}
                      onChange={() => updateField('scoreType', 'gpa')}
                      className="text-sky-600"
                    />
                    <span>GPA (Scale of 4.0 or 10.0)</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="qualifyingScore" className="block text-xs font-semibold text-slate-700 mb-1">
                  Score / GPA Obtained <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="qualifyingScore"
                  name="qualifyingScore"
                  value={formData.qualifyingScore || ''}
                  onChange={(e) => updateField('qualifyingScore', e.target.value)}
                  onBlur={() => handleBlur('qualifyingScore')}
                  placeholder={formData.scoreType === 'gpa' ? 'e.g. 3.85' : 'e.g. 92.5'}
                  className={`w-full px-3 py-1.5 text-sm rounded-lg border bg-white outline-none font-mono ${
                    errors.qualifyingScore ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500'
                  }`}
                  required
                />
                {errors.qualifyingScore && <p className="text-xs text-rose-600 mt-1">{errors.qualifyingScore}</p>}
              </div>
            </div>
          </fieldset>
        )}

        {/* ================= STEP 4: CAMPUS & ELECTIVES ================= */}
        {currentStep === 4 && (
          <fieldset className="space-y-5 border-none p-0 m-0">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <legend className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>4. Campus Services & Extracurriculars</span>
              </legend>
              <span className="text-xs text-slate-400">Hostel, transport & clubs</span>
            </div>

            {/* Hostel Accommodation */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Campus Residence & Hostel Facility</h4>
                  <p className="text-[11px] text-slate-500">Secure on-campus dormitories with dining and high-speed Wi-Fi</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hostelNeeded || false}
                    onChange={(e) => updateField('hostelNeeded', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
              </div>

              {formData.hostelNeeded && (
                <div className="pt-2 border-t border-slate-200">
                  <label htmlFor="hostelRoomType" className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Room Configuration
                  </label>
                  <select
                    id="hostelRoomType"
                    value={formData.hostelRoomType || 'Twin Sharing (AC)'}
                    onChange={(e) => updateField('hostelRoomType', e.target.value as any)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                  >
                    <option value="Single Occupancy">Single Occupancy (Private Bath)</option>
                    <option value="Twin Sharing (AC)">Twin Sharing (Air Conditioned)</option>
                    <option value="Twin Sharing (Standard)">Twin Sharing (Standard)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Campus Transportation */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">University Bus Shuttle Network</h4>
                  <p className="text-[11px] text-slate-500">Daily transit connecting metropolitan hubs to campus gates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.transportNeeded || false}
                    onChange={(e) => updateField('transportNeeded', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
              </div>

              {formData.transportNeeded && (
                <div className="pt-2 border-t border-slate-200">
                  <label htmlFor="transportRoute" className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Convenient Pick-up Route
                  </label>
                  <select
                    id="transportRoute"
                    value={formData.transportRoute || TRANSPORT_ROUTES[0]}
                    onChange={(e) => updateField('transportRoute', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                  >
                    {TRANSPORT_ROUTES.map((route) => (
                      <option key={route} value={route}>{route}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Extracurricular Clubs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Clubs & Extracurricular Activities of Interest (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ACTIVITIES.map((act) => {
                  const isSelected = (formData.activities || []).includes(act);
                  return (
                    <label
                      key={act}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/50 text-slate-900 font-medium'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleActivityToggle(act)}
                        className="rounded text-sky-600 focus:ring-sky-500"
                      />
                      <span>{act}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Scholarship consideration */}
            <div className="p-3 rounded-lg border border-indigo-100 bg-indigo-50/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-950 block">Merit Scholarship Consideration</span>
                <span className="text-[11px] text-indigo-700">Flag this application for University Academic Endowment review</span>
              </div>
              <input
                type="checkbox"
                checked={formData.scholarshipCandidate || false}
                onChange={(e) => updateField('scholarshipCandidate', e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </fieldset>
        )}

        {/* ================= STEP 5: VERIFICATION & SUBMIT ================= */}
        {currentStep === 5 && (
          <fieldset className="space-y-5 border-none p-0 m-0">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <legend className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>5. Verification & Final Declaration</span>
              </legend>
              <span className="text-xs text-slate-400">Review and legally sign</span>
            </div>

            {/* Summary Review Dossier Snippet */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Registration Summary Snapshot
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Candidate Name</span>
                  <span className="font-semibold text-slate-900">
                    {[formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(' ') || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Program</span>
                  <span className="font-semibold text-slate-900">{formData.program || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Email</span>
                  <span className="text-slate-900">{formData.email || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Blood Group</span>
                  <span className="text-rose-700 font-semibold">{formData.bloodGroup || '—'}</span>
                </div>
              </div>
            </div>

            {/* Honor Code & Agreement */}
            <div className="space-y-3">
              <label
                htmlFor="declarationAgreed"
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  errors.declarationAgreed
                    ? 'border-rose-300 bg-rose-50/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  id="declarationAgreed"
                  checked={formData.declarationAgreed || false}
                  onChange={(e) => updateField('declarationAgreed', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Academic Integrity & Code of Conduct Acceptance <span className="text-rose-500">*</span>
                  </span>
                  I hereby certify that all information submitted in this application is complete, authentic, and accurate. 
                  I acknowledge that any falsification or omission will result in immediate disqualification or cancellation of admission. 
                  I agree to abide by all statutes, ordinances, and disciplinary guidelines of Samrat Ashok Technological Institute.
                </div>
              </label>
              {errors.declarationAgreed && (
                <p className="text-xs text-rose-600">{errors.declarationAgreed}</p>
              )}
            </div>

            {/* Digital Signature & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="digitalSignature" className="block text-xs font-semibold text-slate-700 mb-1">
                  Applicant Digital Signature (Type Full Legal Name) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="digitalSignature"
                  name="digitalSignature"
                  value={formData.digitalSignature || ''}
                  onChange={(e) => updateField('digitalSignature', e.target.value)}
                  placeholder="e.g. Liam Christopher Bennett"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none font-serif italic ${
                    errors.digitalSignature ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-sky-500'
                  }`}
                  required
                />
                {errors.digitalSignature && (
                  <p className="text-xs text-rose-600 mt-1">{errors.digitalSignature}</p>
                )}
              </div>

              <div>
                <label htmlFor="signatureDate" className="block text-xs font-semibold text-slate-700 mb-1">
                  Submission Date
                </label>
                <input
                  type="date"
                  id="signatureDate"
                  value={formData.signatureDate || new Date().toISOString().split('T')[0]}
                  readOnly
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-100 text-slate-600 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* Navigation & Submission Controls */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Registration</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
