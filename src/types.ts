export type AgeLevel = 'explorer' | 'creator' | 'innovator';

export interface AgeConfig {
  id: AgeLevel;
  name: string;
  ageRange: string;
  description: string;
  focus: string;
  color: string;
}

export const AGE_CONFIGS: Record<AgeLevel, AgeConfig> = {
  explorer: {
    id: 'explorer',
    name: 'Explorer World',
    ageRange: '3–4 Tahun',
    description: 'Mengenal bentuk, warna, pola sederhana, dan instruksi visual.',
    focus: 'Observasi, klasifikasi bentuk dasar & motorik halus',
    color: 'from-amber-400 to-orange-500',
  },
  creator: {
    id: 'creator',
    name: 'Creator World',
    ageRange: '4–5 Tahun',
    description: 'Mengelompokkan, membandingkan, menyusun strategi sederhana.',
    focus: 'Eksplorasi strategi, trial & error, penalaran sebab-akibat',
    color: 'from-emerald-400 to-teal-600',
  },
  innovator: {
    id: 'innovator',
    name: 'Innovator World',
    ageRange: '5–6 Tahun',
    description: 'Memecahkan masalah bertahap, merancang, menjelaskan ide & kolaborasi.',
    focus: 'Higher-Order Thinking, elaborasi solusi & kepemimpinan tim',
    color: 'from-blue-500 to-indigo-600',
  },
};

export type ActiveTab = 'home' | 'achievements' | 'creations' | 'shop' | 'teacher_dashboard' | 'class_timer' | 'game_eco' | 'game_bridge' | 'game_kindness' | 'game_invention';

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  level: AgeLevel;
  avatar: string;
  coins: number;
  gems: number;
  xp: number;
  maxXp: number;
  stars: number;
  badges: string[];
}

export interface RealWorldMission {
  id: string;
  worldName: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  materialsNeeded: string[];
  teacherSteps: string[];
  childSteps: string[];
  reflectionQuestions: string[];
  sdgGoals: string[];
  kurikulumMerdekaAspects: string[];
}

export type AssessmentGrade = 'BB' | 'MB' | 'BSH' | 'BSB';

export interface ObservationRecord {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: string;
  activityName: string;
  domain: 'Kognitif' | 'Problem Solving' | 'Kreativitas' | 'Sosial-Emosional' | 'Motorik Halus';
  grade: AssessmentGrade;
  indicator: string;
  teacherNote: string;
}
