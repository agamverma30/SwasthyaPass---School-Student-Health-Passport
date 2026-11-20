import React, { useState } from 'react';
import { StudentHealthPassport, RegularMedicine } from '../types/healthPassport';
import { formatCurrentIndianDate } from '../utils/healthUtils';
import { X, Plus, Trash2, HeartPulse, ShieldAlert, Sparkles, User, Users, Pill } from 'lucide-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (newStudent: StudentHealthPassport) => void;
  nurseName: string;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  nurseName
}) => {
  if (!isOpen) return null;

  // Basic Info
  const [studentName, setStudentName] = useState('');
  const [classAndSec, setClassAndSec] = useState('Class 7 - Section A');
  const [rollNo, setRollNo] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [gender, setGender] = useState<'Boy' | 'Girl'>('Boy');
  const [dob, setDob] = useState('15 Jul 2013');
  const [bloodGroup, setBloodGroup] = useState<StudentHealthPassport['bloodGroup']>('B+');

  // Parents / Guardian (Indian Names)
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [guardianName, setGuardianName] = useState('');

  // Medical Info
  const [allergies, setAllergies] = useState('');
  const [hasAllergyAlert, setHasAllergyAlert] = useState(false);
  const [heightCm, setHeightCm] = useState<number>(145);
  const [weightKg, setWeightKg] = useState<number>(40);
  const [medicalSurgeryInPast, setMedicalSurgeryInPast] = useState('');
  const [emergencyContactNo, setEmergencyContactNo] = useState('+91 ');
  const [emergencyContactPerson, setEmergencyContactPerson] = useState('');
  const [chronicCondition, setChronicCondition] = useState('');
  const [hasChronicAlert, setHasChronicAlert] = useState(false);

  // Regular Medicines ("what medicine they eating regularly for which medicine")
  const [medicines, setMedicines] = useState<RegularMedicine[]>([
    {
      id: 'med-new-1',
      medicineName: '',
      forCondition: '',
      dosage: '',
      timing: 'Morning after breakfast',
      prescribedByDoctor: ''
    }
  ]);

  const handleAddMedicineRow = () => {
    setMedicines([
      ...medicines,
      {
        id: `med-${Date.now()}`,
        medicineName: '',
        forCondition: '',
        dosage: '',
        timing: 'Morning after breakfast',
        prescribedByDoctor: ''
      }
    ]);
  };

  const handleRemoveMedicineRow = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index: number, field: keyof RegularMedicine, value: string) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!studentName.trim() || !rollNo.trim() || !motherName.trim() || !fatherName.trim()) {
      setFormError('Please fill out all mandatory student and parent names.');
      return;
    }

    if (!/^\d{4}$/.test(rollNo.trim())) {
      setFormError('Admission No must be exactly 4 digits (e.g. 1042).');
      return;
    }

    const filteredMedicines = medicines.filter((m) => m.medicineName.trim().length > 0);

    const newStudent: StudentHealthPassport = {
      id: `STU-IND-${Math.floor(100 + Math.random() * 900)}`,
      studentName: studentName.trim(),
      classAndSec,
      rollNo: rollNo.trim(),
      gender,
      dob,
      bloodGroup,
      avatarSeed: studentName.toLowerCase().replace(/\s+/g, ''),
      motherName: motherName.trim(),
      fatherName: fatherName.trim(),
      guardianName: guardianName.trim() || 'None',
      allergies: allergies.trim() || 'No known allergies reported',
      hasAllergyAlert: hasAllergyAlert || allergies.trim().length > 0,
      heightCm: Number(heightCm) || 140,
      weightKg: Number(weightKg) || 35,
      medicalSurgeryInPast: medicalSurgeryInPast.trim() || 'None reported',
      emergencyContactNo: emergencyContactNo.trim(),
      emergencyContactPerson: emergencyContactPerson.trim() || `${fatherName.trim()} (Father)`,
      chronicCondition: chronicCondition.trim() || 'None reported',
      hasChronicAlert: hasChronicAlert || chronicCondition.trim().length > 0,
      regularMedicines: filteredMedicines,
      isActive: true,
      lastUpdated: formatCurrentIndianDate(),
      lastUpdatedBy: nurseName,
      parentUsername: `parent.${studentName.toLowerCase().split(' ')[0]}`
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Register New Student</h2>
              <p className="text-xs text-amber-100">Dispensary Health Passport Creation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Scrollable Area */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-rose-800">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Basic Student Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-amber-800">
              <User className="w-4 h-4" />
              <span>1. Student Identity</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advait Joshi, Diya Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Admission No (4 digits) *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{4}"
                  maxLength={4}
                  required
                  placeholder="e.g. 1042"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Class & Section *
                </label>
                <select
                  value={classAndSec}
                  onChange={(e) => setClassAndSec(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                >
                  <option value="Class 4 - Section B">Class 4 - Section B</option>
                  <option value="Class 5 - Section C">Class 5 - Section C</option>
                  <option value="Class 6 - Section B">Class 6 - Section B</option>
                  <option value="Class 7 - Section A">Class 7 - Section A</option>
                  <option value="Class 7 - Section B">Class 7 - Section B</option>
                  <option value="Class 8 - Section A">Class 8 - Section A</option>
                  <option value="Class 8 - Section C">Class 8 - Section C</option>
                  <option value="Class 9 - Section A">Class 9 - Section A</option>
                  <option value="Class 10 - Section A">Class 10 - Section A</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Group *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as StudentHealthPassport['bloodGroup'])}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono font-bold text-slate-900"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Boy' | 'Girl')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                >
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15 Jul 2013"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Parents & Guardian */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-indigo-800">
              <Users className="w-4 h-4" />
              <span>2. Parents & Guardian</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mother&apos;s Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shalini Joshi"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Father&apos;s Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prakash Joshi"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Guardian&apos;s Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vinod Joshi (Chacha) or None"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Contact Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={emergencyContactNo}
                  onChange={(e) => setEmergencyContactNo(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person & Relationship
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prakash Joshi (Father)"
                  value={emergencyContactPerson}
                  onChange={(e) => setEmergencyContactPerson(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Medical Information */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-rose-800">
              <HeartPulse className="w-4 h-4" />
              <span>3. Medical Information, Allergies & Surgery History</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="80"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="15"
                  max="150"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Allergies
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-rose-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAllergyAlert}
                      onChange={(e) => setHasAllergyAlert(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="font-semibold">Mark as Medical Alert</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Peanuts, Penicillin, Dust allergy, or None"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  History of Medical Surgery
                </label>
                <input
                  type="text"
                  placeholder="e.g. Appendectomy in 2023 at Apollo Hospital, or None"
                  value={medicalSurgeryInPast}
                  onChange={(e) => setMedicalSurgeryInPast(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Chronic Condition
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-amber-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasChronicAlert}
                      onChange={(e) => setHasChronicAlert(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold">Mark Monitored Condition</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Mild Childhood Asthma, Type 1 Diabetes, or None"
                  value={chronicCondition}
                  onChange={(e) => setChronicCondition(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 4: What medicine they eating regularly for which medicine */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-blue-800">
                  <Pill className="w-4 h-4" />
                  <span>4. Regular Ongoing Medications</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  What medicine they are taking regularly & for which condition
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddMedicineRow}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medicine</span>
              </button>
            </div>

            {medicines.map((med, idx) => (
              <div key={med.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600 uppercase">
                    Prescription #{idx + 1}
                  </span>
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicineRow(idx)}
                      className="text-rose-600 hover:text-rose-800 p-1 text-xs"
                      title="Remove medicine"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Medicine Name (e.g. Levocetirizine)"
                      value={med.medicineName}
                      onChange={(e) => handleMedicineChange(idx, 'medicineName', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="For Which Condition (e.g. Morning sneezing)"
                      value={med.forCondition}
                      onChange={(e) => handleMedicineChange(idx, 'forCondition', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 5ml, 1 Tablet)"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Timing (e.g. After Lunch, SOS)"
                      value={med.timing}
                      onChange={(e) => handleMedicineChange(idx, 'timing', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Save Student Health Passport
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
