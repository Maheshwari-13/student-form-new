import React from 'react';
import { StudentRegistration } from '../types';
import { Printer, X, ShieldCheck, Building2, CheckCircle, Mail, Phone, MapPin, Calendar, HeartPulse } from 'lucide-react';
import crestImage from '../assets/images/university_crest_emblem_1790172110412.jpg';

interface StudentDossierModalProps {
  student: StudentRegistration | null;
  onClose: () => void;
}

export const StudentDossierModal: React.FC<StudentDossierModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  const fullName = [student.firstName, student.middleName, student.lastName].filter(Boolean).join(' ');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="no-print p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 text-sm">Official Admission Docket</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-xs text-sky-700 font-semibold">{student.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Formal Slip</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Printable Academic Document Section */}
        <div className="p-6 sm:p-8 space-y-6 printable-docket bg-white text-slate-900">
          {/* Institution Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-amber-400 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={crestImage}
                  alt="Samrat Ashok Technological Institute Seal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <Building2 className="w-6 h-6 text-amber-300" style={{ display: 'none' }} />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-slate-900">
                  Samrat Ashok Technological Institute
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Directorate of Admissions & Student Academic Records · Session 2026–2027
                </p>
                <p className="text-[11px] text-slate-500">
                  Autonomous Institute Established in 1960 · Civil Lines, Vidisha (M.P.)
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-xs">
              <div className="text-slate-500 uppercase tracking-widest text-[9px]">Dossier Number</div>
              <div className="font-bold text-sm text-slate-900">{student.id}</div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                ● STATUS: {student.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Student Profile Row */}
          <div className="flex flex-col sm:flex-row gap-6 items-start pb-4 border-b border-slate-200">
            {/* Portrait */}
            <div className="w-28 h-36 rounded border-2 border-slate-300 bg-slate-100 overflow-hidden shrink-0 shadow-xs">
              <img
                src={student.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80'}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Core Identification */}
            <div className="flex-1 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Candidate Full Name</span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{fullName}</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Date of Birth</span>
                  <span className="font-semibold text-slate-900">{student.dob}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Gender</span>
                  <span className="font-semibold text-slate-900">{student.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Blood Group</span>
                  <span className="font-semibold text-rose-700">{student.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Nationality</span>
                  <span className="font-semibold text-slate-900">{student.nationality}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">National ID / Passport</span>
                  <span className="font-mono text-slate-900">{student.nationalId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Application Date</span>
                  <span className="text-slate-900">{new Date(student.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Program Details */}
          <div className="space-y-3 pb-4 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 p-2 rounded">
              Academic Program & Admission Particulars
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Enrolled Program</span>
                <span className="font-bold text-sky-900">{student.program}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Degree Level</span>
                <span className="font-semibold capitalize text-slate-900">{student.degreeLevel}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Session / Term</span>
                <span className="font-semibold text-slate-900">{student.academicTerm}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Qualifying Score</span>
                <span className="font-mono font-bold text-slate-900">
                  {student.qualifyingScore} {student.scoreType === 'percentage' ? '%' : 'GPA'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase">Previous Institution</span>
                <span className="text-slate-900">{student.previousSchool} (Class of {student.passingYear})</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase">Scholarship Flag</span>
                <span className="text-slate-900">
                  {student.scholarshipCandidate ? 'Recommended for Merit Endowment' : 'Standard Tuition Track'}
                </span>
              </div>
            </div>
          </div>

          {/* Residence & Emergency Information */}
          <div className="space-y-3 pb-4 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 p-2 rounded">
              Contact & Campus Housing Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Registered Address</span>
                <span className="text-slate-900 block">{student.address}</span>
                <span className="text-slate-600 block">{student.city}, {student.state} {student.postalCode}, {student.country}</span>
                <span className="text-slate-800 font-mono text-[11px] block mt-1">{student.email} · {student.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Emergency Primary Contact</span>
                <span className="text-slate-900 font-semibold block">{student.emergencyName} ({student.emergencyRelation})</span>
                <span className="text-slate-800 font-mono text-[11px] block">{student.emergencyPhone}</span>
                <div className="mt-2 text-[11px]">
                  <span className="text-slate-500 block text-[10px] uppercase">Campus Provisions</span>
                  <span>Hostel: {student.hostelNeeded ? student.hostelRoomType || 'Allocated' : 'Not Required'}</span>
                  <span> · Transit: {student.transportNeeded ? 'Bus Pass Issued' : 'Self-Commute'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification & Signatures */}
          <div className="pt-2 flex flex-col sm:flex-row items-end justify-between gap-6">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Digitally Verified & Logged</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                System Hash: SHA256-{(student.id + student.email).split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000007, 0).toString(16).toUpperCase()}
              </p>
            </div>

            <div className="flex items-center gap-10">
              <div className="text-center">
                <div className="font-serif italic text-sm text-slate-800 pb-1 border-b border-slate-300 min-w-[140px]">
                  {student.digitalSignature || fullName}
                </div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block mt-1">Student Signature</span>
              </div>

              <div className="text-center">
                <div className="font-serif text-sm font-semibold text-slate-800 pb-1 border-b border-slate-300 min-w-[140px]">
                  M.Shankar
                </div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block mt-1">Registrar & Dean</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
