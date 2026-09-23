import React, { useState } from 'react';
import { StudentRegistration } from '../types';
import { QrCode, ShieldCheck, Printer, RotateCw, Sparkles, Building2, Phone, HeartPulse } from 'lucide-react';
import crestImage from '../assets/images/university_crest_emblem_1790172110412.jpg';

interface StudentIdCardProps {
  student: Partial<StudentRegistration>;
  onPrint?: () => void;
}

export const StudentIdCard: React.FC<StudentIdCardProps> = ({ student, onPrint }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const fullName = [student.firstName, student.middleName, student.lastName].filter(Boolean).join(' ') || 'Student Name';
  const regId = student.id || 'REG-2026-PENDING';
  const program = student.program || 'Undergraduate Degree Program';
  const bloodGroup = student.bloodGroup || 'O+';
  const emergencyPhone = student.emergencyPhone || '+1 (555) 019-2834';
  const photo = student.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80';

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Action Controls Above Card */}
      <div className="w-full flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Samrat Ashok Technological Institute</span>
          <span>·</span>
          <span>Student Identity Card</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            title="Flip to view card reverse"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Card</span>
          </button>
        </div>
      </div>

      {/* The Physical Card Container */}
      <div className="w-full max-w-[380px] h-[240px] perspective-1000">
        <div
          className={`relative w-full h-full duration-500 transition-transform transform-style-3d shadow-xl rounded-xl border border-slate-300 overflow-hidden ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* FRONT OF THE CARD */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col justify-between p-4 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Top University Band */}
            <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={crestImage}
                    alt="Samrat Ashok Technological Institute Crest"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <Building2 className="w-4 h-4 text-amber-300" style={{ display: 'none' }} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-100 leading-tight">
                    Samrat Ashok Technological Institute
                  </h4>
                  <p className="text-[9px] text-slate-300 leading-none">Engineering & Sciences · Vidisha</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] tracking-wide text-amber-300 font-semibold tabular-nums">
                  {regId}
                </span>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest">Valid Thru 2030</p>
              </div>
            </div>

            {/* Middle Section: Photo & Vital Details */}
            <div className="flex items-center gap-3.5 py-1">
              {/* Photo Box */}
              <div className="relative w-20 h-24 rounded-md border-2 border-white/20 bg-slate-800 overflow-hidden shrink-0 shadow-inner">
                <img
                  src={photo}
                  alt={fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback avatar
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] text-center text-slate-200 py-0.5 font-mono">
                  STUDENT
                </div>
              </div>

              {/* Bio & Academic Program */}
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <h3 className="text-sm font-bold text-white tracking-tight truncate leading-tight">
                  {fullName}
                </h3>
                <p className="text-[11px] text-indigo-200 font-medium truncate">
                  {program}
                </p>

                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[10px] text-slate-300">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase">Blood Group</span>
                    <span className="font-semibold text-rose-300 flex items-center gap-1">
                      <HeartPulse className="w-3 h-3 text-rose-400 inline" /> {bloodGroup}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase">Nationality</span>
                    <span className="font-medium text-slate-200 truncate block">
                      {student.nationality || 'General'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Barcode Simulator & Chips */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px]">
              <div className="flex items-center gap-1.5 font-mono text-slate-400 text-[10px] tracking-widest tabular-nums">
                ||| | |||| | ||||| |||
              </div>
              <div className="flex items-center gap-1 text-[9px] text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Authorized Identity</span>
              </div>
            </div>
          </div>

          {/* BACK OF THE CARD */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-900 text-white p-4 flex flex-col justify-between [transform:rotateY(180deg)] backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                  Campus Regulations & Access
                </span>
                <span className="text-[9px] font-mono text-slate-400">Card Serial: {regId.replace('REG-', 'CRD-')}</span>
              </div>

              <div className="text-[9px] leading-relaxed text-slate-300 space-y-1">
                <p>1. This card is non-transferable and remains property of Samrat Ashok Technological Institute.</p>
                <p>2. Must be presented on request for library, lab facilities, and campus transit.</p>
                <p>3. If found, please return to Student Affairs Office or Campus Security.</p>
              </div>

              <div className="mt-2.5 p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Emergency Contact</span>
                  <span className="text-[10px] font-semibold text-slate-100 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-400" /> {emergencyPhone}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Campus Helpline</span>
                  <span className="text-[10px] font-mono text-slate-300">+91 (7592) 250121</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[8px] text-slate-400">
              <div className="flex items-center gap-1">
                <QrCode className="w-5 h-5 text-slate-300" />
                <span>Scan for Instant Digital Verification</span>
              </div>
              <div className="text-right">
                <span className="italic block font-serif text-[10px] text-slate-300">Registrar Signatory</span>
                <span>Dean of Admissions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-slate-400 text-center">
        Real-time card preview updates dynamically as the form fields are completed.
      </p>
    </div>
  );
};
