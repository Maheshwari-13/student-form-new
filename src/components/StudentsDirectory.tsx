import React, { useState } from 'react';
import { StudentRegistration, RegistrationStatus } from '../types';
import { 
  Search, Filter, Download, Eye, Trash2, Printer, 
  CheckCircle, Clock, AlertTriangle, FileSpreadsheet, UserCheck, Shield
} from 'lucide-react';

interface StudentsDirectoryProps {
  students: StudentRegistration[];
  onSelectStudent: (student: StudentRegistration) => void;
  onViewIdCard: (student: StudentRegistration) => void;
  onDeleteStudent: (id: string) => void;
  onStatusChange: (id: string, newStatus: RegistrationStatus) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onOpenNewRegistration: () => void;
}

export const StudentsDirectory: React.FC<StudentsDirectoryProps> = ({
  students,
  onSelectStudent,
  onViewIdCard,
  onDeleteStudent,
  onStatusChange,
  onExportCsv,
  onExportJson,
  onOpenNewRegistration,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName} ${s.middleName || ''} ${s.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.program.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesProgram = programFilter === 'all' || s.program === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'Enrolled':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-800 text-[11px] font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
            <span>Enrolled</span>
          </span>
        );
      case 'Verified & Admitted':
        return (
          <span className="inline-flex items-center gap-1 text-sky-800 text-[11px] font-semibold">
            <Shield className="w-3.5 h-3.5 text-sky-600 inline" />
            <span>Verified & Admitted</span>
          </span>
        );
      case 'Pending Review':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-amber-800 text-[11px] font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600 inline" />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  const programs = Array.from(new Set(students.map((s) => s.program)));

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header & Directory Stats */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Registered Students Directory
            </h2>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              ({students.length} applicants total)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Samrat Ashok Technological Institute · Admissions Registry & Academic Records
          </p>
        </div>

        {/* Global Directory Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            title="Download records as CSV spreadsheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            title="Export raw JSON records"
          >
            <Download className="w-3.5 h-3.5 text-sky-600" />
            <span>Export JSON</span>
          </button>
          <button
            type="button"
            onClick={onOpenNewRegistration}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
          >
            <span>+ New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 border-b border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ID, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500"
            >
              <option value="all">All Admission Statuses</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Verified & Admitted">Verified & Admitted</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>

          {/* Program Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white outline-none focus:border-sky-500 max-w-[220px] truncate"
            >
              <option value="all">All Academic Programs</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
              <th className="py-3 px-4">Student ID & Photo</th>
              <th className="py-3 px-4">Candidate Name</th>
              <th className="py-3 px-4">Program & Term</th>
              <th className="py-3 px-4">Qualifying Score</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((st) => {
                const fullName = `${st.firstName} ${st.middleName ? st.middleName + ' ' : ''}${st.lastName}`;
                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* ID & Photo */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80'}
                          alt={fullName}
                          className="w-8 h-9 rounded object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <span className="font-mono text-slate-900 font-semibold block tabular-nums">
                            {st.id}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(st.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Name & Blood Group */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{fullName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <span>DOB: {st.dob}</span>
                        <span>·</span>
                        <span className="text-rose-600 font-medium">BG: {st.bloodGroup}</span>
                      </div>
                    </td>

                    {/* Program & Term */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800 truncate max-w-[200px]" title={st.program}>
                        {st.program}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {st.academicTerm} · {st.degreeLevel}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4 font-mono tabular-nums">
                      <span className="font-semibold text-slate-900">
                        {st.qualifyingScore} {st.scoreType === 'percentage' ? '%' : 'GPA'}
                      </span>
                      {st.scholarshipCandidate && (
                        <span className="block text-[10px] text-indigo-600 font-sans font-medium">
                          Scholarship Flagged
                        </span>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="py-3 px-4">
                      <div className="text-slate-800">{st.email}</div>
                      <div className="text-[11px] text-slate-500 font-mono tabular-nums">{st.phone}</div>
                    </td>

                    {/* Status with quick cycle toggle */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div>{getStatusBadge(st.status)}</div>
                        <select
                          value={st.status}
                          onChange={(e) => onStatusChange(st.id, e.target.value as RegistrationStatus)}
                          className="text-[10px] py-0.5 px-1.5 rounded border border-slate-200 bg-white text-slate-600 outline-none hover:border-slate-300"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Verified & Admitted">Verified & Admitted</option>
                          <option value="Enrolled">Enrolled</option>
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1 justify-end">
                        <button
                          type="button"
                          onClick={() => onSelectStudent(st)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          title="View Full Admission Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewIdCard(st)}
                          className="p-1.5 rounded hover:bg-slate-100 text-sky-600 hover:text-sky-900 transition-colors cursor-pointer"
                          title="Preview ID Badge"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete application for ${fullName}?`)) {
                              onDeleteStudent(st.id);
                            }
                          }}
                          className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400">
                  <p className="text-sm font-medium text-slate-600">No student registration records found.</p>
                  <p className="text-xs mt-1">Try adjusting your search criteria or register a new student.</p>
                  <button
                    type="button"
                    onClick={onOpenNewRegistration}
                    className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    Open Registration Form
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
