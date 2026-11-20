import React from 'react';
import { StudentHealthPassport, AuthUser } from '../types/healthPassport';
import { StudentPassportCard } from './StudentPassportCard';
import { ShieldCheck, HeartHandshake, Phone, Clock } from 'lucide-react';

interface ParentViewProps {
  currentUser: AuthUser;
  childStudent: StudentHealthPassport;
}

export const ParentView: React.FC<ParentViewProps> = ({
  currentUser,
  childStudent
}) => {
  return (
    <div className="space-y-6">
      {/* Parent Welcome Header */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider text-teal-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Parent Portal • Verified Health Passport</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Namaste, {currentUser.name}
            </h1>
            <p className="text-sm text-teal-100 max-w-xl">
              Viewing certified health passport for your child, <strong className="text-white font-bold">{childStudent.studentName}</strong> ({childStudent.classAndSec}, Admission No. {childStudent.rollNo}).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0 text-right">
            <div className="text-[11px] text-teal-200 uppercase font-bold tracking-wider flex items-center justify-end gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Last Updated</span>
            </div>
            <p className="text-base font-extrabold text-white mt-1 font-mono">
              {childStudent.lastUpdated}
            </p>
            <span className="text-xs text-teal-200">
              Verified by: {childStudent.lastUpdatedBy}
            </span>
          </div>
        </div>

        {/* Read-only notice */}
        <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-teal-100">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-teal-300 shrink-0" />
            <span>
              Parent View: This passport is maintained by the School Health Dispensary. No edits or additions are permitted from this view.
            </span>
          </div>
          <div className="flex items-center gap-2 text-white font-medium">
            <Phone className="w-3.5 h-3.5 text-teal-300" />
            <span>Dispensary Contact: +91 11 2659 0100</span>
          </div>
        </div>
      </div>

      {/* Embedded Child Passport Card in Parent Mode (Strictly No Edit and No Add buttons) */}
      <StudentPassportCard
        student={childStudent}
        userRole="parent"
      />
    </div>
  );
};
