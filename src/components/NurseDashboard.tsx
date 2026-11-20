import React, { useState, useMemo } from 'react';
import { StudentHealthPassport } from '../types/healthPassport';
import { Search, UserX, UserCheck, ChevronRight, UserPlus } from 'lucide-react';

interface NurseDashboardProps {
  students: StudentHealthPassport[];
  onSelectStudent: (student: StudentHealthPassport) => void;
  onToggleStatus: (studentId: string) => void;
  onAddNewStudent?: () => void;
  nurseName?: string;
}

export const NurseDashboard: React.FC<NurseDashboardProps> = ({
  students,
  onSelectStudent,
  onToggleStatus,
  onAddNewStudent
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered list by search query (student name or class)
  const filteredStudents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return students;
    return students.filter(
      (s) =>
        s.studentName.toLowerCase().includes(query) ||
        s.classAndSec.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Page Title: Student Directory */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Student Directory
          </h1>
          <p className="text-xs text-teal-700 font-medium mt-0.5">
            Click on any student to view their Health Passport card
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {filteredStudents.length} student{filteredStudents.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by student name or class..."
          className="block w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-2xl shadow-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Students List: Student Name, Class, and Deactivate button */}
      {filteredStudents.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {filteredStudents.map((student) => {
            return (
              <div
                key={student.id}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors hover:bg-teal-50/40 ${
                  !student.isActive ? 'bg-slate-50/80 opacity-75' : ''
                }`}
              >
                {/* Clickable Student Name and Class */}
                <div
                  onClick={() => onSelectStudent(student)}
                  className="flex-1 cursor-pointer flex items-center gap-3.5 group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-transform group-hover:scale-105 ${
                    student.isActive
                      ? 'bg-gradient-to-tr from-teal-500 to-indigo-600 text-white shadow-xs'
                      : 'bg-slate-300 text-slate-600'
                  }`}>
                    {student.studentName.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {student.studentName}
                      </h3>
                      {!student.isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                          Deactivated
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {student.classAndSec}
                    </p>
                  </div>
                </div>

                {/* Deactivate / Reactivate button */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(student.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      student.isActive
                        ? 'text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100'
                        : 'text-teal-700 bg-teal-50 border-teal-200 hover:bg-teal-100'
                    }`}
                    title={student.isActive ? 'Deactivate student' : 'Reactivate student'}
                  >
                    {student.isActive ? (
                      <>
                        <UserX className="w-3.5 h-3.5" />
                        <span>Deactivate</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  {/* Arrow Indicator for Card View */}
                  <button
                    type="button"
                    onClick={() => onSelectStudent(student)}
                    className="p-1.5 text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
                    title="View Health Passport Card"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
          <p className="text-sm font-semibold text-slate-700">
            No students found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-3.5 py-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Add New Student Button Placed in the Last */}
      {onAddNewStudent && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={onAddNewStudent}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 shadow-md shadow-teal-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add New Student</span>
          </button>
        </div>
      )}

    </div>
  );
};
