/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentRegistration, RegistrationStatus } from './types';
import { INITIAL_STUDENTS } from './data/departments';
import { Navbar } from './components/Navbar';
import { StudentForm } from './components/StudentForm';
import { StudentIdCard } from './components/StudentIdCard';
import { StudentsDirectory } from './components/StudentsDirectory';
import { StudentDossierModal } from './components/StudentDossierModal';
import { CodeViewerModal } from './components/CodeViewerModal';
import campusBannerImage from './assets/images/student_campus_banner_1790172125139.jpg';
import { 
  Building2, CheckCircle2, ShieldCheck, Award, 
  Sparkles, FileText, Download, UserPlus, BookOpen, Clock, HeartHandshake
} from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState<StudentRegistration[]>(() => {
    try {
      const stored = localStorage.getItem('registered_students');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_STUDENTS;
  });

  const [activeView, setActiveView] = useState<'form' | 'directory' | 'card'>('form');
  const [selectedStudentForDossier, setSelectedStudentForDossier] = useState<StudentRegistration | null>(null);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<StudentRegistration | null>(null);
  const [isCodeViewerOpen, setIsCodeViewerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live draft tracking for instant ID card preview
  const [liveFormData, setLiveFormData] = useState<Partial<StudentRegistration>>({
    firstName: 'Devon',
    lastName: 'Archer',
    program: 'B.Tech Computer Science',
    bloodGroup: 'B+',
    dob: '2005-06-15',
    nationality: 'United States',
    emergencyPhone: '+1 (555) 349-8102',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('registered_students', JSON.stringify(students));
    } catch {
      // storage error handling
    }
  }, [students]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStudentSubmit = (newStudent: StudentRegistration) => {
    setStudents((prev) => [newStudent, ...prev]);
    setSelectedStudentForDossier(newStudent);
    setSelectedStudentForCard(newStudent);
    showToast(`Registration Successful! Assigned ID: ${newStudent.id}`);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('Student record deleted from directory');
  };

  const handleStatusChange = (id: string, newStatus: RegistrationStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast(`Applicant status updated to: ${newStatus}`);
  };

  const handleFillSample = () => {
    const sampleOptions = [
      {
        firstName: 'Sophia',
        middleName: 'Claire',
        lastName: 'Montgomery',
        dob: '2005-09-14',
        gender: 'Female' as const,
        bloodGroup: 'O+' as const,
        nationality: 'United States',
        nationalId: 'US-928-103-882',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80',
        email: 'sophia.montgomery@example.edu',
        phone: '+1 (555) 782-9014',
        address: '450 University Terrace, Apt 3B',
        city: 'Cambridge',
        state: 'Massachusetts',
        postalCode: '02138',
        country: 'United States',
        emergencyName: 'Margaret Montgomery',
        emergencyRelation: 'Parent',
        emergencyPhone: '+1 (555) 782-9000',
        degreeLevel: 'undergraduate' as const,
        program: 'B.Tech AI & Data Science',
        academicTerm: 'Fall 2026',
        previousSchool: 'Phillips Exeter Academy',
        passingYear: '2025',
        qualifyingScore: '96.4',
        scoreType: 'percentage' as const,
        hostelNeeded: true,
        hostelRoomType: 'Twin Sharing (AC)' as const,
        transportNeeded: false,
        activities: ['Robotics & AI Innovation Lab', 'Coding & Competitive Programming Club'],
        scholarshipCandidate: true,
        declarationAgreed: true,
        digitalSignature: 'Sophia C. Montgomery',
      },
      {
        firstName: 'Rohan',
        middleName: '',
        lastName: 'Mukherjee',
        dob: '2004-03-22',
        gender: 'Male' as const,
        bloodGroup: 'A+' as const,
        nationality: 'Indian',
        nationalId: 'IND-882-910-334',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
        email: 'rohan.mukherjee@example.org',
        phone: '+91 98301 22910',
        address: '12/4 Southern Avenue, Ballygunge',
        city: 'Kolkata',
        state: 'West Bengal',
        postalCode: '700029',
        country: 'India',
        emergencyName: 'Alok Mukherjee',
        emergencyRelation: 'Parent',
        emergencyPhone: '+91 98301 22900',
        degreeLevel: 'postgraduate' as const,
        program: 'M.Tech Artificial Intelligence',
        academicTerm: 'Fall 2026',
        previousSchool: 'Jadavpur University',
        passingYear: '2025',
        qualifyingScore: '3.94',
        scoreType: 'gpa' as const,
        hostelNeeded: false,
        transportNeeded: true,
        transportRoute: 'Route 1: North Metro Station - City Center - Campus',
        activities: ['National Debate & Model United Nations', 'Entrepreneurship & Startup Incubator'],
        scholarshipCandidate: true,
        declarationAgreed: true,
        digitalSignature: 'Rohan Mukherjee',
      },
    ];

    const pick = sampleOptions[Math.floor(Math.random() * sampleOptions.length)];
    setLiveFormData(pick);
    showToast('Loaded realistic applicant sample into registration form!');
  };

  const handleExportCsv = () => {
    if (students.length === 0) {
      showToast('No students to export.');
      return;
    }
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Program', 'Degree', 'Status', 'Date'];
    const rows = students.map((s) => [
      `"${s.id}"`,
      `"${s.firstName}"`,
      `"${s.lastName}"`,
      `"${s.email}"`,
      `"${s.phone}"`,
      `"${s.program}"`,
      `"${s.degreeLevel}"`,
      `"${s.status}"`,
      `"${s.createdAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `samrat_ashok_technological_institute_students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded student records as CSV spreadsheet.');
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(students, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `samrat_ashok_technological_institute_students_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.removeChild(downloadAnchor);
    showToast('Exported complete JSON data.');
  };

  const activeStudentForCardView = selectedStudentForCard || students[0] || (liveFormData as StudentRegistration);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar Contract (Single line brand wordmark, 4 nav links, primary actions) */}
      <Navbar
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
        onOpenCodeViewer={() => setIsCodeViewerOpen(true)}
        onFillSampleData={handleFillSample}
        studentsCount={students.length}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* VIEW 1: REGISTRATION FORM + LIVE ID CARD COMPANION */}
        {activeView === 'form' && (
          <div className="space-y-6">
            {/* Academic Banner */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 h-32 sm:h-40 bg-slate-900 shadow-2xs">
              <img
                src={campusBannerImage}
                alt="Samrat Ashok Technological Institute Campus"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent p-6 flex flex-col justify-center">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                  Admissions Open · Academic Year 2026–2027
                </span>
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  Samrat Ashok Technological Institute
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl hidden sm:block">
                  Student Registration & Admission Portal — Complete your academic application, preview your official digital identity badge in real-time, and download your verified admission pass.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Multi-step Form */}
              <div className="lg:col-span-7 space-y-4">
                <StudentForm
                  onStudentSubmit={handleStudentSubmit}
                  onLiveChange={(data) => setLiveFormData(data)}
                  onFillDemo={handleFillSample}
                  liveData={liveFormData}
                />
              </div>

              {/* Right 5 Columns: Live Student ID Card Preview & Institutional Accreditations */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
                {/* ID Card Box */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <StudentIdCard
                    student={liveFormData}
                    onPrint={() => window.print()}
                  />
                </div>

                {/* Admissions Guidance & Quick Specs */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Admissions Checklist & Criteria</span>
                  </h3>

                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Applicant must have completed high school/bachelor degree with min 60% or 3.0 GPA.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Official ID cards are issued upon administrative document verification.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>On-campus housing and transit allotments are allocated on a first-confirmed basis.</span>
                    </li>
                  </ul>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Fall 2026 Deadline: July 31</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveView('directory')}
                      className="text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
                    >
                      View Registered List →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: REGISTERED STUDENTS DIRECTORY */}
        {activeView === 'directory' && (
          <StudentsDirectory
            students={students}
            onSelectStudent={(st) => setSelectedStudentForDossier(st)}
            onViewIdCard={(st) => {
              setSelectedStudentForCard(st);
              setActiveView('card');
            }}
            onDeleteStudent={handleDeleteStudent}
            onStatusChange={handleStatusChange}
            onExportCsv={handleExportCsv}
            onExportJson={handleExportJson}
            onOpenNewRegistration={() => setActiveView('form')}
          />
        )}

        {/* VIEW 3: STUDENT ID BADGE & CREDENTIALS STUDIO */}
        {activeView === 'card' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-center space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Identity Verification Badge</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select an applicant from directory or preview active badge
                </p>
              </div>

              {/* Student Selector Dropdown */}
              <div className="max-w-md mx-auto flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Selected Applicant:</span>
                <select
                  value={activeStudentForCardView.id || ''}
                  onChange={(e) => {
                    const found = students.find((s) => s.id === e.target.value);
                    if (found) setSelectedStudentForCard(found);
                  }}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.id} — {st.firstName} {st.lastName} ({st.program})
                    </option>
                  ))}
                </select>
              </div>

              {/* Card Canvas */}
              <div className="py-4 flex justify-center">
                <StudentIdCard
                  student={activeStudentForCardView}
                  onPrint={() => window.print()}
                />
              </div>

              <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForDossier(activeStudentForCardView as StudentRegistration)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Full Admission Slip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('directory')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <span>Back to Directory</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Samrat Ashok Technological Institute</span>
            <span>·</span>
            <span>Office of Student Affairs & Admissions</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setIsCodeViewerOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              HTML, CSS & JS Code Inspector
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveView('directory')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Registered Students ({students.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Full Admission Dossier / Printable Docket Modal */}
      <StudentDossierModal
        student={selectedStudentForDossier}
        onClose={() => setSelectedStudentForDossier(null)}
      />

      {/* Pure HTML, CSS & JavaScript Code Showcase Modal */}
      <CodeViewerModal
        isOpen={isCodeViewerOpen}
        onClose={() => setIsCodeViewerOpen(false)}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
