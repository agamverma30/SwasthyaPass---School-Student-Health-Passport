import { StudentHealthPassport, AuthUser } from '../types/healthPassport';

export const INITIAL_STUDENTS: StudentHealthPassport[] = [
  {
    id: 'STU-IND-101',
    studentName: 'Vihaan Sharma',
    classAndSec: 'Class 8 - Section A',
    rollNo: '1014',
    gender: 'Boy',
    dob: '12 Sep 2012',
    bloodGroup: 'B+',
    avatarSeed: 'vihaan',
    motherName: 'Sunita Sharma',
    fatherName: 'Rajesh Sharma',
    guardianName: 'Ramesh Sharma (Chacha)',
    allergies: 'Severe Peanut allergy & Dust pollen allergy (Carries EpiPen in school bag)',
    hasAllergyAlert: true,
    heightCm: 152,
    weightKg: 44,
    medicalSurgeryInPast: 'Appendectomy performed in July 2023 at Fortis Hospital, New Delhi',
    emergencyContactNo: '+91 98112 34567',
    emergencyContactPerson: 'Rajesh Sharma (Father)',
    alternateContactNo: '+91 98112 76543',
    chronicCondition: 'Mild Childhood Asthma (Triggered during cold mornings and PT exercises)',
    hasChronicAlert: true,
    regularMedicines: [
      {
        id: 'med-1',
        medicineName: 'Levocetirizine 5mg',
        forCondition: 'Allergic rhinitis and morning sneezing bouts',
        dosage: '1 tablet nightly after dinner',
        timing: 'Night (9:00 PM)',
        prescribedByDoctor: 'Dr. Alok Verma, Pediatrician'
      },
      {
        id: 'med-2',
        medicineName: 'Budecort Inhaler 100mcg',
        forCondition: 'Preventive inhaler for mild bronchial asthma',
        dosage: '1 puff with spacer twice daily',
        timing: 'Morning (7:30 AM) & Evening (8:00 PM)',
        prescribedByDoctor: 'Dr. Sanjeev Kapoor, Pulmonologist'
      }
    ],
    isActive: true,
    lastUpdated: '04 Nov 2026, 11:30 AM',
    lastUpdatedBy: 'Sister Priya Nair (Dispensary Lead)',
    parentUsername: 'parent.sunita'
  },
  {
    id: 'STU-IND-102',
    studentName: 'Ananya Patel',
    classAndSec: 'Class 6 - Section B',
    rollNo: '1007',
    gender: 'Girl',
    dob: '24 Mar 2014',
    bloodGroup: 'O+',
    avatarSeed: 'ananya',
    motherName: 'Meera Patel',
    fatherName: 'Vikram Patel',
    guardianName: 'Hansa Patel (Dadi)',
    allergies: 'Lactose intolerance (Mild dairy reaction, strictly avoid dairy in canteen lunch)',
    hasAllergyAlert: true,
    heightCm: 138,
    weightKg: 32,
    medicalSurgeryInPast: 'None',
    emergencyContactNo: '+91 98250 87654',
    emergencyContactPerson: 'Vikram Patel (Father)',
    alternateContactNo: '+91 98250 12345',
    chronicCondition: 'None reported',
    hasChronicAlert: false,
    regularMedicines: [
      {
        id: 'med-3',
        medicineName: 'Becosules Junior Syrup',
        forCondition: 'Nutritional multivitamin supplement',
        dosage: '5 ml once daily',
        timing: 'After breakfast (8:00 AM)',
        prescribedByDoctor: 'Dr. Radhika Desai, Child Specialist'
      }
    ],
    isActive: true,
    lastUpdated: '02 Nov 2026, 03:15 PM',
    lastUpdatedBy: 'Nurse Sunita Menon',
    parentUsername: 'parent.vikram'
  },
  {
    id: 'STU-IND-103',
    studentName: 'Aarav Verma',
    classAndSec: 'Class 10 - Section A',
    rollNo: '1022',
    gender: 'Boy',
    dob: '05 Jan 2010',
    bloodGroup: 'A+',
    avatarSeed: 'aarav',
    motherName: 'Pooja Verma',
    fatherName: 'Amit Verma',
    guardianName: 'Suresh Verma (Grandfather)',
    allergies: 'Penicillin and Amoxicillin antibiotic allergy',
    hasAllergyAlert: true,
    heightCm: 168,
    weightKg: 58,
    medicalSurgeryInPast: 'Fractured left forearm reduction with cast in August 2024',
    emergencyContactNo: '+91 98710 44321',
    emergencyContactPerson: 'Amit Verma (Father)',
    alternateContactNo: '+91 98710 99887',
    chronicCondition: 'Juvenile Migraine triggered by dehydration and glaring afternoon sun',
    hasChronicAlert: true,
    regularMedicines: [
      {
        id: 'med-4',
        medicineName: 'Naproxen 250mg (SOS only)',
        forCondition: 'Acute migraine attack pain relief',
        dosage: '1 tablet with plenty of water upon aura onset',
        timing: 'Emergency SOS (Needs Nurse approval in dispensary)',
        prescribedByDoctor: 'Dr. Manoj Saxena, Neurologist'
      }
    ],
    isActive: true,
    lastUpdated: '03 Nov 2026, 09:40 AM',
    lastUpdatedBy: 'Sister Priya Nair (Dispensary Lead)',
    parentUsername: 'parent.amit'
  },
  {
    id: 'STU-IND-104',
    studentName: 'Diya Iyer',
    classAndSec: 'Class 5 - Section C',
    rollNo: '1003',
    gender: 'Girl',
    dob: '18 Jul 2015',
    bloodGroup: 'AB+',
    avatarSeed: 'diya',
    motherName: 'Lakshmi Iyer',
    fatherName: 'Venkat Iyer',
    guardianName: 'Raman Iyer (Periappa)',
    allergies: 'None known',
    hasAllergyAlert: false,
    heightCm: 130,
    weightKg: 28,
    medicalSurgeryInPast: 'Tonsillectomy in December 2022 at Manipal Hospital, Bengaluru',
    emergencyContactNo: '+91 98450 67890',
    emergencyContactPerson: 'Lakshmi Iyer (Mother)',
    alternateContactNo: '+91 98450 11223',
    chronicCondition: 'None',
    hasChronicAlert: false,
    regularMedicines: [
      {
        id: 'med-5',
        medicineName: 'Iron & Folic Acid Tonic',
        forCondition: 'Mild borderline hemoglobin improvement',
        dosage: '1 teaspoonful (5ml)',
        timing: 'After dinner (8:30 PM)',
        prescribedByDoctor: 'Dr. Swaminathan, Pediatrician'
      }
    ],
    isActive: true,
    lastUpdated: '28 Oct 2026, 11:15 AM',
    lastUpdatedBy: 'Nurse Anjali Rao',
    parentUsername: 'parent.lakshmi'
  },
  {
    id: 'STU-IND-105',
    studentName: 'Kabir Mehta',
    classAndSec: 'Class 7 - Section B',
    rollNo: '1018',
    gender: 'Boy',
    dob: '30 Oct 2013',
    bloodGroup: 'B-',
    avatarSeed: 'kabir',
    motherName: 'Ritu Mehta',
    fatherName: 'Gaurav Mehta',
    guardianName: 'Ashok Mehta (Grandfather)',
    allergies: 'Egg yolk allergy (mild skin hives)',
    hasAllergyAlert: true,
    heightCm: 147,
    weightKg: 41,
    medicalSurgeryInPast: 'None',
    emergencyContactNo: '+91 99200 33445',
    emergencyContactPerson: 'Gaurav Mehta (Father)',
    alternateContactNo: '+91 99200 66778',
    chronicCondition: 'Allergic Sinusitis',
    hasChronicAlert: false,
    regularMedicines: [
      {
        id: 'med-6',
        medicineName: 'Saline Nasal Mist',
        forCondition: 'Nasal clearance and sinus soothing',
        dosage: '2 sprays each nostril',
        timing: 'Morning and before bedtime',
        prescribedByDoctor: 'Dr. Tarun Bhalla, ENT Specialist'
      }
    ],
    isActive: true,
    lastUpdated: '01 Nov 2026, 01:20 PM',
    lastUpdatedBy: 'Sister Priya Nair (Dispensary Lead)',
    parentUsername: 'parent.ritu'
  },
  {
    id: 'STU-IND-106',
    studentName: 'Sanvi Reddy',
    classAndSec: 'Class 9 - Section A',
    rollNo: '1011',
    gender: 'Girl',
    dob: '09 Nov 2011',
    bloodGroup: 'O-',
    avatarSeed: 'sanvi',
    motherName: 'Kavita Reddy',
    fatherName: 'Srinivas Reddy',
    guardianName: 'Padmavathi Reddy (Ammama)',
    allergies: 'Sulfa medications allergy & Shellfish',
    hasAllergyAlert: true,
    heightCm: 158,
    weightKg: 49,
    medicalSurgeryInPast: 'Laser correction of ingrown toenail (Minor, March 2025)',
    emergencyContactNo: '+91 98490 55667',
    emergencyContactPerson: 'Srinivas Reddy (Father)',
    alternateContactNo: '+91 98490 22334',
    chronicCondition: 'Mild exercise-induced wheeze',
    hasChronicAlert: false,
    regularMedicines: [
      {
        id: 'med-7',
        medicineName: 'Asthalin Inhaler (Salbutamol 100mcg)',
        forCondition: 'Reliever inhaler before inter-house football or sprint drills',
        dosage: '1 puff 15 minutes before vigorous sports',
        timing: 'Prior to PE / Sports period',
        prescribedByDoctor: 'Dr. Chaitanya Prasad, Sports Physician'
      }
    ],
    isActive: true,
    lastUpdated: '04 Nov 2026, 04:10 PM',
    lastUpdatedBy: 'Nurse Sunita Menon',
    parentUsername: 'parent.kavita'
  },
  {
    id: 'STU-IND-107',
    studentName: 'Ishaan Mukherjee',
    classAndSec: 'Class 4 - Section B',
    rollNo: '1009',
    gender: 'Boy',
    dob: '03 Feb 2016',
    bloodGroup: 'A-',
    avatarSeed: 'ishaan',
    motherName: 'Sharmila Mukherjee',
    fatherName: 'Subhash Mukherjee',
    guardianName: 'Debashis Mukherjee (Kaku)',
    allergies: 'None reported',
    hasAllergyAlert: false,
    heightCm: 124,
    weightKg: 24,
    medicalSurgeryInPast: 'None',
    emergencyContactNo: '+91 98300 77889',
    emergencyContactPerson: 'Subhash Mukherjee (Father)',
    alternateContactNo: '+91 98300 11990',
    chronicCondition: 'None',
    hasChronicAlert: false,
    regularMedicines: [
      {
        id: 'med-8',
        medicineName: 'Chewable Vitamin D3 (600 IU)',
        forCondition: 'Bone density and general pediatric wellness',
        dosage: '1 chewable tablet',
        timing: 'Morning with milk (7:45 AM)',
        prescribedByDoctor: 'Dr. Debabrata Roy, Pediatrician'
      }
    ],
    isActive: false, // Exemplar deactivated student to test reactivation and filtering
    lastUpdated: '25 Oct 2026, 10:00 AM',
    lastUpdatedBy: 'Nurse Anjali Rao',
    parentUsername: 'parent.sharmila'
  },
  {
    id: 'STU-IND-108',
    studentName: 'Tanvi Deshmukh',
    classAndSec: 'Class 8 - Section C',
    rollNo: '1025',
    gender: 'Girl',
    dob: '17 Jun 2012',
    bloodGroup: 'B+',
    avatarSeed: 'tanvi',
    motherName: 'Neha Deshmukh',
    fatherName: 'Sachin Deshmukh',
    guardianName: 'Balasaheb Deshmukh (Ajoba)',
    allergies: 'Severe Mustard seed & Cashew nut allergy',
    hasAllergyAlert: true,
    heightCm: 150,
    weightKg: 42,
    medicalSurgeryInPast: 'None',
    emergencyContactNo: '+91 98220 99112',
    emergencyContactPerson: 'Neha Deshmukh (Mother)',
    alternateContactNo: '+91 98220 44556',
    chronicCondition: 'None',
    hasChronicAlert: false,
    regularMedicines: [
      {
        id: 'med-9',
        medicineName: 'Cetirizine Syrup 5ml (SOS)',
        forCondition: 'Emergency anti-histamine for inadvertent allergen ingestion',
        dosage: '5ml immediate dose',
        timing: 'Emergency SOS only (Dispensary emergency kit kept in school locker)',
        prescribedByDoctor: 'Dr. Milind Kulkarni, Allergist'
      }
    ],
    isActive: true,
    lastUpdated: '03 Nov 2026, 02:15 PM',
    lastUpdatedBy: 'Sister Priya Nair (Dispensary Lead)',
    parentUsername: 'parent.neha'
  }
];

export const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  // Primary Requested Credentials
  'nurse': {
    password: 'nurse 123',
    user: {
      username: 'nurse',
      name: 'Sister Priya Nair',
      role: 'nurse',
      designation: 'Senior School Health Dispensary Lead'
    }
  },
  'parent': {
    password: 'parents 123',
    user: {
      username: 'parent',
      name: 'Sunita Sharma',
      role: 'parent',
      linkedStudentId: 'STU-IND-101',
      childName: 'Vihaan Sharma'
    }
  },

  // Nurse Accounts (Indian Names)
  'nurse.priya': {
    password: 'nurse 123',
    user: {
      username: 'nurse.priya',
      name: 'Sister Priya Nair',
      role: 'nurse',
      designation: 'Senior School Health Dispensary Lead'
    }
  },
  'nurse.sunita': {
    password: 'nurse 123',
    user: {
      username: 'nurse.sunita',
      name: 'Nurse Sunita Menon',
      role: 'nurse',
      designation: 'Pediatric Wellness Nurse'
    }
  },

  // Parent Accounts (Indian Names, mapped to child)
  'parent.sunita': {
    password: 'parents 123',
    user: {
      username: 'parent.sunita',
      name: 'Sunita Sharma',
      role: 'parent',
      linkedStudentId: 'STU-IND-101',
      childName: 'Vihaan Sharma'
    }
  },
  'parent.vikram': {
    password: 'parents 123',
    user: {
      username: 'parent.vikram',
      name: 'Vikram Patel',
      role: 'parent',
      linkedStudentId: 'STU-IND-102',
      childName: 'Ananya Patel'
    }
  },
  'parent.amit': {
    password: 'parents 123',
    user: {
      username: 'parent.amit',
      name: 'Amit Verma',
      role: 'parent',
      linkedStudentId: 'STU-IND-103',
      childName: 'Aarav Verma'
    }
  },
  'parent.lakshmi': {
    password: 'parents 123',
    user: {
      username: 'parent.lakshmi',
      name: 'Lakshmi Iyer',
      role: 'parent',
      linkedStudentId: 'STU-IND-104',
      childName: 'Diya Iyer'
    }
  },
  'parent.ritu': {
    password: 'parents 123',
    user: {
      username: 'parent.ritu',
      name: 'Ritu Mehta',
      role: 'parent',
      linkedStudentId: 'STU-IND-105',
      childName: 'Kabir Mehta'
    }
  },
  'parent.kavita': {
    password: 'parents 123',
    user: {
      username: 'parent.kavita',
      name: 'Kavita Reddy',
      role: 'parent',
      linkedStudentId: 'STU-IND-106',
      childName: 'Sanvi Reddy'
    }
  },
  'parent.sharmila': {
    password: 'parents 123',
    user: {
      username: 'parent.sharmila',
      name: 'Sharmila Mukherjee',
      role: 'parent',
      linkedStudentId: 'STU-IND-107',
      childName: 'Ishaan Mukherjee'
    }
  },
  'parent.neha': {
    password: 'parents 123',
    user: {
      username: 'parent.neha',
      name: 'Neha Deshmukh',
      role: 'parent',
      linkedStudentId: 'STU-IND-108',
      childName: 'Tanvi Deshmukh'
    }
  }
};

