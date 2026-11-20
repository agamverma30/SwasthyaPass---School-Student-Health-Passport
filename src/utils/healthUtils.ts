export function calculateBMI(heightCm: number, weightKg: number): {
  bmi: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  colorClass: string;
} {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return { bmi: 0, category: 'Normal', colorClass: 'text-slate-600' };
  }
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  if (bmi < 18.5) {
    return { bmi, category: 'Underweight', colorClass: 'text-amber-600' };
  } else if (bmi <= 24.9) {
    return { bmi, category: 'Normal', colorClass: 'text-emerald-600' };
  } else if (bmi <= 29.9) {
    return { bmi, category: 'Overweight', colorClass: 'text-amber-700' };
  } else {
    return { bmi, category: 'Obese', colorClass: 'text-rose-600' };
  }
}

export function formatCurrentIndianDate(): string {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const strHours = String(hours).padStart(2, '0');
  return `${day} ${month} ${year}, ${strHours}:${minutes} ${ampm}`;
}

export const STUDENT_COLOR_PALETTES = [
  { bg: 'bg-emerald-500', text: 'text-emerald-950', border: 'border-emerald-300', light: 'bg-emerald-50', gradient: 'from-emerald-500 to-teal-600' },
  { bg: 'bg-amber-500', text: 'text-amber-950', border: 'border-amber-300', light: 'bg-amber-50', gradient: 'from-amber-500 to-orange-600' },
  { bg: 'bg-indigo-600', text: 'text-indigo-950', border: 'border-indigo-300', light: 'bg-indigo-50', gradient: 'from-indigo-600 to-blue-700' },
  { bg: 'bg-rose-500', text: 'text-rose-950', border: 'border-rose-300', light: 'bg-rose-50', gradient: 'from-rose-500 to-pink-600' },
  { bg: 'bg-violet-600', text: 'text-violet-950', border: 'border-violet-300', light: 'bg-violet-50', gradient: 'from-violet-600 to-purple-700' },
  { bg: 'bg-cyan-600', text: 'text-cyan-950', border: 'border-cyan-300', light: 'bg-cyan-50', gradient: 'from-cyan-600 to-sky-700' }
];

export function getStudentPalette(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % STUDENT_COLOR_PALETTES.length;
  return STUDENT_COLOR_PALETTES[index];
}
