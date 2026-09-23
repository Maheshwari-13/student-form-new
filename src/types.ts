export type DegreeLevel = 'undergraduate' | 'postgraduate' | 'diploma';

export type RegistrationStatus = 'Pending Review' | 'Verified & Admitted' | 'Enrolled';

export interface StudentRegistration {
  id: string;
  createdAt: string;
  status: RegistrationStatus;
  
  // Section 1: Personal Details
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say';
  bloodGroup: string;
  nationality: string;
  nationalId: string;
  photoUrl: string;

  // Section 2: Contact & Address
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;

  // Section 3: Academic Information
  degreeLevel: DegreeLevel;
  program: string;
  academicTerm: string;
  previousSchool: string;
  passingYear: string;
  qualifyingScore: string;
  scoreType: 'gpa' | 'percentage';

  // Section 4: Campus Services & Electives
  hostelNeeded: boolean;
  hostelRoomType?: 'Single Occupancy' | 'Twin Sharing (AC)' | 'Twin Sharing (Standard)';
  transportNeeded: boolean;
  transportRoute?: string;
  activities: string[];
  scholarshipCandidate: boolean;

  // Section 5: Declaration
  declarationAgreed: boolean;
  digitalSignature: string;
  signatureDate: string;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;

export interface FormErrors {
  [key: string]: string;
}
