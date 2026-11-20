import React, { useState, useEffect } from 'react';
import { StudentHealthPassport, AuthUser } from './types/healthPassport';
import { INITIAL_STUDENTS } from './data/initialStudents';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { NurseDashboard } from './components/NurseDashboard';
import { StudentPassportCard } from './components/StudentPassportCard';
import { ParentView } from './components/ParentView';
import { AddStudentModal } from './components/AddStudentModal';
import { EditStudentModal } from './components/EditStudentModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const STORAGE_KEY_STUDENTS = 'swasthya_pass_students_v1';
const STORAGE_KEY_USER = 'swasthya_pass_active_user_v1';

export default function App() {
  // Load students from localStorage or fallback to initial data
  const [students, setStudents] = useState<StudentHealthPassport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (saved) {
        const parsed: StudentHealthPassport[] = JSON.parse(saved);
        return parsed.map((s) => {
          const digits = (s.rollNo || '').replace(/\D/g, '');
          if (digits.length > 0 && digits.length < 4) {
            return {
              ...s,
              rollNo: digits.length <= 2 ? `10${digits.padStart(2, '0')}` : digits.padStart(4, '0')
            };
          }
          return s;
        });
      }
    } catch (e) {
      console.error('Failed reading students from localStorage', e);
    }
    return INITIAL_STUDENTS;
  });

  // Current authenticated user (Nurse or Parent)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading user from localStorage', e);
    }
    return null;
  });

  // Currently inspected student in Nurse view (null means showing directory)
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentHealthPassport | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'alert' } | null>(null);

  const showToast = (text: string, type: 'success' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync students state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.error('Failed saving students to localStorage', e);
    }
  }, [students]);

  // Sync user state to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error('Failed saving user to localStorage', e);
    }
  }, [currentUser]);

  // Handle Login
  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setSelectedStudentId(null);
    showToast(`Welcome, ${user.name}! Authenticated as ${user.role === 'nurse' ? 'Dispensary Nurse' : 'Student Parent'}.`);
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedStudentId(null);
    showToast('Logged out safely from School Health Passport portal.');
  };

  // Handle Deactivate / Reactivate Student toggle
  const handleToggleStatus = (studentId: string) => {
    let studentName = '';
    let newStatus = false;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          studentName = s.studentName;
          newStatus = !s.isActive;
          return {
            ...s,
            isActive: !s.isActive
          };
        }
        return s;
      })
    );

    showToast(
      newStatus
        ? `Health Passport record for ${studentName} is now ACTIVE.`
        : `Health Passport record for ${studentName} has been DEACTIVATED.`,
      newStatus ? 'success' : 'alert'
    );
  };

  // Handle Add New Student
  const handleAddStudent = (newStudent: StudentHealthPassport) => {
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`New Health Passport generated for ${newStudent.studentName} (${newStudent.classAndSec}).`);
  };

  // Handle Save Edited Student
  const handleSaveStudent = (updatedStudent: StudentHealthPassport) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    showToast(`Health Passport for ${updatedStudent.studentName} updated successfully.`);
  };

  // Find currently selected student for Nurse view
  const activeStudent = students.find((s) => s.id === selectedStudentId);

  // If user is Parent, find their linked child
  const parentChild = currentUser?.role === 'parent'
    ? students.find((s) => s.id === currentUser.linkedStudentId || s.parentUsername === currentUser.username) || students[0]
    : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Bar Contract compliant Navbar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold ${
            toastMessage.type === 'success'
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-rose-900 text-white border-rose-700'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Page 1: Login Page (Shown when no user is logged in) */}
        {!currentUser && (
          <LoginPage onLoginSuccess={handleLogin} />
        )}

        {/* Page 2: Nurse Portal */}
        {currentUser && currentUser.role === 'nurse' && (
          <>
            {selectedStudentId && activeStudent ? (
              /* When nurse clicks on any student -> views Student Health Passport Card */
              <StudentPassportCard
                student={activeStudent}
                userRole="nurse"
                onBackToList={() => setSelectedStudentId(null)}
                onEdit={(stu) => setStudentToEdit(stu)}
                onToggleStatus={handleToggleStatus}
              />
            ) : (
              /* Nurse First Page: Student Directory with search bar, student name, class, and deactivate button */
              <NurseDashboard
                students={students}
                onSelectStudent={(stu) => setSelectedStudentId(stu.id)}
                onToggleStatus={handleToggleStatus}
                onAddNewStudent={() => setIsAddModalOpen(true)}
              />
            )}
          </>
        )}

        {/* Page 3: Parent Portal (Automatically shows their child's card only, strictly no edit and no add) */}
        {currentUser && currentUser.role === 'parent' && parentChild && (
          <ParentView
            currentUser={currentUser}
            childStudent={parentChild}
          />
        )}
      </main>

      {/* Nurse Only: Add New Student Modal */}
      {isAddModalOpen && currentUser?.role === 'nurse' && (
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddStudent={handleAddStudent}
          nurseName={currentUser.name}
        />
      )}

      {/* Nurse Only: Edit Student Health Record Modal */}
      {studentToEdit && currentUser?.role === 'nurse' && (
        <EditStudentModal
          student={studentToEdit}
          isOpen={Boolean(studentToEdit)}
          onClose={() => setStudentToEdit(null)}
          onSave={handleSaveStudent}
          nurseName={currentUser.name}
        />
      )}
    </div>
  );
}
