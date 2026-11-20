import React, { useState } from 'react';
import { StudentHealthPassport, RegularMedicine } from '../types/healthPassport';
import { formatCurrentIndianDate } from '../utils/healthUtils';
import { X, Plus, Trash2, HeartPulse, Edit3, User, Users, Pill, ShieldAlert } from 'lucide-react';

interface EditStudentModalProps {
  student: StudentHealthPassport;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: StudentHealthPassport) => void;
  nurseName: string;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  student,
  isOpen,
  onClose,
  onSave,
  nurseName
}) => {
  if (!isOpen) return null;

  // Form State initialized with current student data
  const [studentName, setStudentName] = useState(student.studentName);
  const [classAndSec, setClassAndSec] = useState(student.classAndSec);
  const [rollNo, setRollNo] = useState(student.rollNo);
  const [formError, setFormError] = useState<string | null>(null);
  const [gender, setGender] = useState<'Boy' | 'Girl'>(student.gender);
  const [dob, setDob] = useState(student.dob);
  const [bloodGroup, setBloodGroup] = useState<StudentHealthPassport['bloodGroup']>(student.bloodGroup);

  // Parents / Guardian
  const [motherName, setMotherName] = useState(student.motherName);
  const [fatherName, setFatherName] = useState(student.fatherName);
  const [guardianName, setGuardianName] = useState(student.guardianName);

  // Medical Info
  const [allergies, setAllergies] = useState(student.allergies);
  const [hasAllergyAlert, setHasAllergyAlert] = useState(student.hasAllergyAlert);
  const [heightCm, setHeightCm] = useState<number>(student.heightCm);
  const [weightKg, setWeightKg] = useState<number>(student.weightKg);
  const [medicalSurgeryInPast, setMedicalSurgeryInPast] = useState(student.medicalSurgeryInPast);
  const [emergencyContactNo, setEmergencyContactNo] = useState(student.emergencyContactNo);
  const [emergencyContactPerson, setEmergencyContactPerson] = useState(student.emergencyContactPerson);
  const [chronicCondition, setChronicCondition] = useState(student.chronicCondition);
  const [hasChronicAlert, setHasChronicAlert] = useState(student.hasChronicAlert);

  // Regular Medicines
  const [medicines, setMedicines] = useState<RegularMedicine[]>(
    student.regularMedicines.length > 0
      ? student.regularMedicines
      : [
          {
            id: 'med-new',
            medicineName: '',
            forCondition: '',
            dosage: '',
            timing: '',
            prescribedByDoctor: ''
          }
        ]
  );

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

    if (!/^\d{4}$/.test(rollNo.trim())) {
      setFormError('Admission No must be exactly 4 digits (e.g. 1014).');
      return;
    }

    const filteredMedicines = medicines.filter((m) => m.medicineName.trim().length > 0);

    const updatedStudent: StudentHealthPassport = {
      ...student,
      studentName: studentName.trim(),
      classAndSec,
      rollNo: rollNo.trim(),
      gender,
      dob,
      bloodGroup,
      motherName: motherName.trim(),
      fatherName: fatherName.trim(),
      guardianName: guardianName.trim() || 'None',
      allergies: allergies.trim() || 'No known allergies reported',
      hasAllergyAlert: hasAllergyAlert || allergies.toLowerCase().includes('severe') || allergies.toLowerCase().includes('allergy'),
      heightCm: Number(heightCm) || student.heightCm,
      weightKg: Number(weightKg) || student.weightKg,
      medicalSurgeryInPast: medicalSurgeryInPast.trim() || 'None reported',
      emergencyContactNo: emergencyContactNo.trim(),
      emergencyContactPerson: emergencyContactPerson.trim(),
      chronicCondition: chronicCondition.trim() || 'None reported',
      hasChronicAlert: hasChronicAlert || (chronicCondition.trim().length > 0 && !chronicCondition.toLowerCase().includes('none')),
      regularMedicines: filteredMedicines,
      lastUpdated: formatCurrentIndianDate(),
      lastUpdatedBy: nurseName
    };

    onSave(updatedStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-indigo-900 p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Edit Health Passport Record</h2>
              <p className="text-xs text-teal-100">
                Updating {student.studentName} ({student.id})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
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

          {/* Section 1: Basic Info */}
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
                  placeholder="e.g. 1014"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Class & Section
                </label>
                <input
                  type="text"
                  value={classAndSec}
                  onChange={(e) => setClassAndSec(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as StudentHealthPassport['bloodGroup'])}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
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
                  Date of Birth
                </label>
                <input
                  type="text"
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
                  Mother&apos;s Name
                </label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Father&apos;s Name
                </label>
                <input
                  type="text"
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
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Contact Number
                </label>
                <input
                  type="text"
                  value={emergencyContactNo}
                  onChange={(e) => setEmergencyContactNo(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={emergencyContactPerson}
                  onChange={(e) => setEmergencyContactPerson(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Medical Information */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-rose-800">
              <HeartPulse className="w-4 h-4" />
              <span>3. Medical Information, Vitals & Surgeries</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
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
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  History of Medical Surgery
                </label>
                <input
                  type="text"
                  value={medicalSurgeryInPast}
                  onChange={(e) => setMedicalSurgeryInPast(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
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
                  value={chronicCondition}
                  onChange={(e) => setChronicCondition(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
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
                  <span>4. Regular Ongoing Medications Schedule</span>
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
              <div key={med.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600 uppercase">
                    Prescription #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicineRow(idx)}
                    className="text-rose-600 hover:text-rose-800 p-1 text-xs"
                    title="Remove medicine"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-medium">Medicine Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Budecort Inhaler"
                      value={med.medicineName}
                      onChange={(e) => handleMedicineChange(idx, 'medicineName', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 font-medium">For Which Condition</label>
                    <input
                      type="text"
                      placeholder="e.g. Prevent asthma attacks"
                      value={med.forCondition}
                      onChange={(e) => handleMedicineChange(idx, 'forCondition', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 font-medium">Dosage</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 puff with spacer"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 font-medium">Timing & Schedule</label>
                    <input
                      type="text"
                      placeholder="e.g. Morning 7:30 AM & Evening 8:00 PM"
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
              className="px-6 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Update Health Passport
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
