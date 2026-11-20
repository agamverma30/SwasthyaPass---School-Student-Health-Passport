import React from 'react';
import { StudentHealthPassport, UserRole } from '../types/healthPassport';
import { calculateBMI, getStudentPalette } from '../utils/healthUtils';
import {
  HeartPulse,
  PhoneCall,
  Users,
  ShieldCheck,
  Pill,
  Clock,
  Edit3,
  UserX,
  UserCheck,
  QrCode,
  Info
} from 'lucide-react';

interface StudentPassportCardProps {
  student: StudentHealthPassport;
  userRole: UserRole;
  onEdit?: (student: StudentHealthPassport) => void;
  onToggleStatus?: (studentId: string) => void;
  onBackToList?: () => void;
}

export const StudentPassportCard: React.FC<StudentPassportCardProps> = ({
  student,
  userRole,
  onEdit,
  onToggleStatus,
  onBackToList
}) => {
  const palette = getStudentPalette(student.studentName);
  const bmiInfo = calculateBMI(student.heightCm, student.weightKg);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Utility Bar: Back button only (No Print button, No Switch User button) */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        {onBackToList && (
          <button
            onClick={onBackToList}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            ← Back to Student Directory
          </button>
        )}

        {/* Quick status badge */}
        <div className="ml-auto">
          {student.isActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Active Record
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Deactivated
            </span>
          )}
        </div>
      </div>

      {/* Main Digital Health Passport Container */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-teal-200 overflow-hidden relative print:shadow-none print:border-slate-400">
        
        {/* Passport Header Banner with Vibrant Teal/Indigo Gradient */}
        <div className="bg-gradient-to-r from-teal-700 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0">
                <img
                  src="/src/assets/images/health_passport_logo_1793885371336.jpg"
                  alt="Health Passport Logo"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                    Health Passport
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-slate-300">Student Health Registry</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
                  Student Health Passport
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  Passport ID: <span className="font-mono text-teal-200 font-semibold">{student.id}</span>
                </p>
              </div>
            </div>

            {/* Verification Stamp & QR Code */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-teal-300 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Record</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono">
                  Admission No. {student.rollNo} · {student.bloodGroup}
                </div>
              </div>
              <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center text-slate-900 shadow-sm shrink-0">
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>
            </div>
          </div>

          {/* Status & Last Updated Strip */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Status:</span>
              {student.isActive ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-500/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Deactivated
                </span>
              )}
            </div>

            {/* Last Updated Timestamp */}
            <div className="flex items-center gap-2 text-slate-200 text-xs">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              <span>Last Updated: <strong className="text-white font-semibold font-mono">{student.lastUpdated}</strong></span>
              <span className="text-slate-400">by {student.lastUpdatedBy}</span>
            </div>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Student Name, Class, Sec, Roll No, Family Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Student Bio */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-teal-50/50 rounded-2xl p-5 border border-teal-100">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${palette.gradient} text-white font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0 border-2 border-white`}>
                  {student.studentName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                    Student Details
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {student.studentName}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mt-1">
                    <span>{student.classAndSec}</span>
                    <span>·</span>
                    <span>Admission No. {student.rollNo}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-teal-200/50 text-center">
                <div className="bg-white rounded-xl p-2.5 border border-slate-200/60 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Blood Group</span>
                  <p className="text-base font-extrabold text-rose-600 font-mono mt-0.5">{student.bloodGroup}</p>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-slate-200/60 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Gender</span>
                  <p className="text-xs font-bold text-slate-800 mt-1">{student.gender}</p>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-slate-200/60 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">DOB</span>
                  <p className="text-xs font-bold text-slate-800 mt-1">{student.dob}</p>
                </div>
              </div>
            </div>

            {/* Parents & Guardian Information */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Family & Guardian</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mother&apos;s Name</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">{student.motherName}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Father&apos;s Name</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">{student.fatherName}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guardian&apos;s Name</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">{student.guardianName || 'None'}</p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-3 p-3 bg-gradient-to-r from-rose-50 to-teal-50 rounded-xl border border-rose-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">Emergency Contact No</span>
                    <p className="text-sm font-extrabold text-slate-900 font-mono">{student.emergencyContactNo}</p>
                    <span className="text-[11px] text-slate-600">Contact: {student.emergencyContactPerson}</span>
                  </div>
                </div>

                <a
                  href={`tel:${student.emergencyContactNo.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Emergency</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section 2: Medical Information: Allergy, Height, Weight, Surgery, Chronic Condition */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Student Medical Information</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Health Registry Profile</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Allergy */}
              <div className={`p-4 rounded-2xl border ${
                student.hasAllergyAlert
                  ? 'bg-rose-50/70 border-rose-300'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-900">
                    Allergy
                  </span>
                  {student.hasAllergyAlert && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-600 text-white rounded-md">
                      ALERT
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-800 leading-relaxed min-h-[44px]">
                  {student.allergies || 'No known allergies'}
                </p>
              </div>

              {/* Height & Weight */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                  Height & Weight
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Height</span>
                    <p className="text-sm font-extrabold text-slate-900 font-mono">{student.heightCm} cm</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Weight</span>
                    <p className="text-sm font-extrabold text-slate-900 font-mono">{student.weightKg} kg</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 font-medium">BMI: <strong className="font-mono text-slate-900">{bmiInfo.bmi}</strong></span>
                  <span className={`font-bold ${bmiInfo.colorClass}`}>
                    {bmiInfo.category}
                  </span>
                </div>
              </div>

              {/* History of Medical Surgery */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 mb-2 block">
                  History of Medical Surgery
                </span>
                <p className="text-xs font-medium text-slate-800 leading-relaxed min-h-[44px]">
                  {student.medicalSurgeryInPast || 'None reported'}
                </p>
              </div>

              {/* Chronic Condition */}
              <div className={`p-4 rounded-2xl border ${
                student.hasChronicAlert
                  ? 'bg-amber-50/70 border-amber-300'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                    Chronic Condition
                  </span>
                  {student.hasChronicAlert && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500 text-white rounded-md">
                      MONITORED
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-800 leading-relaxed min-h-[44px]">
                  {student.chronicCondition || 'None reported'}
                </p>
              </div>

            </div>
          </div>

          {/* Section 3: What Medicine They Eating Regularly For Which Medicine */}
          <div className="bg-gradient-to-br from-slate-50 to-teal-50/40 rounded-2xl p-6 border border-teal-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Regular Medications Schedule
                  </h3>
                  <p className="text-xs text-slate-500">
                    What medicine they are eating regularly for which condition
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                {student.regularMedicines?.length || 0} Registered
              </span>
            </div>

            {student.regularMedicines && student.regularMedicines.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Medicine Name</th>
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">For Which Condition</th>
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Dosage</th>
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Timing</th>
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Doctor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 font-medium">
                    {student.regularMedicines.map((med) => (
                      <tr key={med.id} className="hover:bg-white/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-500" />
                            <span>{med.medicineName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700">
                          {med.forCondition}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-900 font-semibold">
                          {med.dosage}
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-100 text-teal-900 font-semibold text-[11px]">
                            <Clock className="w-3 h-3 text-teal-700" />
                            {med.timing}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {med.prescribedByDoctor || 'Pediatric Consultant'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 bg-white rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                No regular medicines recorded for this student.
              </div>
            )}
          </div>

          {/* EDIT BUTTON IN THE LAST: Only in nurse card at the very end of the card */}
          {userRole === 'nurse' && onEdit && (
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Info className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Authorized Dispensary Nurse: Click to update vitals, allergies, or medicines.</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onToggleStatus && (
                  <button
                    onClick={() => onToggleStatus(student.id)}
                    type="button"
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      student.isActive
                        ? 'text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100'
                        : 'text-teal-700 bg-teal-50 border-teal-200 hover:bg-teal-100'
                    }`}
                  >
                    {student.isActive ? 'Deactivate Student' : 'Activate Student'}
                  </button>
                )}
                <button
                  onClick={() => onEdit(student)}
                  type="button"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 shadow-md shadow-teal-600/25 active:scale-95 transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Health Passport</span>
                </button>
              </div>
            </div>
          )}

          {/* Parent Mode Footer (No Edit, No Add) */}
          {userRole === 'parent' && (
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs text-teal-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Parent View: Official certified student record. Last updated: <strong>{student.lastUpdated}</strong>.</span>
              </div>
              <span className="text-[11px] text-teal-700 font-semibold uppercase">Read-Only</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
