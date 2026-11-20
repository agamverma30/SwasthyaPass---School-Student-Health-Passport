export type UserRole = 'nurse' | 'parent';

export interface RegularMedicine {
  id: string;
  medicineName: string;
  forCondition: string; // "for which medicine they eating regularly"
  dosage: string; // e.g. "5ml", "1 Tablet (500mg)", "2 Puffs"
  timing: string; // e.g. "After Lunch (1:30 PM)", "Morning & Evening", "As needed before sports"
  prescribedByDoctor?: string;
}

export interface StudentHealthPassport {
  id: string;
  studentName: string;
  classAndSec: string; // e.g. "Class 8 - Section A"
  rollNo: string;
  gender: 'Boy' | 'Girl';
  dob: string; // e.g. "14 Aug 2012"
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  avatarSeed: string; // For generating colorful consistent avatar
  
  // Family Information (Only Indian Names)
  motherName: string;
  fatherName: string;
  guardianName: string;
  
  // Medical Information
  allergies: string; // e.g. "Peanuts, Dust mite, Sulpha drugs" or "No known allergies"
  hasAllergyAlert: boolean;
  
  heightCm: number; // e.g. 142
  weightKg: number; // e.g. 38
  
  medicalSurgeryInPast: string; // e.g. "Appendectomy in June 2023 (Apollo Hospital, Delhi)" or "None"
  
  emergencyContactNo: string; // e.g. "+91 98765 43210"
  emergencyContactPerson: string; // e.g. "Rajesh Sharma (Father)"
  alternateContactNo?: string;
  
  chronicCondition: string; // e.g. "Mild Bronchial Asthma", "Type 1 Diabetes", "None"
  hasChronicAlert: boolean;
  
  regularMedicines: RegularMedicine[];
  
  // Status & Timestamps
  isActive: boolean; // For Deactivate button
  lastUpdated: string; // e.g. "04 Nov 2026, 02:45 PM"
  lastUpdatedBy: string; // e.g. "Sister Priya Nair (Dispensary Lead)"
  
  parentUsername: string; // Linked parent account username
}

export interface AuthUser {
  username: string;
  name: string;
  role: UserRole;
  designation?: string; // For Nurse: "Head Dispensary Nurse"
  linkedStudentId?: string; // For Parent: points to their child's ID
  childName?: string; // e.g. "Vihaan Sharma"
}
