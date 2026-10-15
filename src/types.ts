/**
 * Types and interfaces for GeoMacera (5th Grade Geometry).
 */

export type ChapterId = 'kesisen' | 'paralel_cakisik' | 'uc_dogru' | 'paralel_kesen' | 'sampiyona' | 'atolye';

export type QuestionType =
  | 'multiple_choice'
  | 'angle_calc'
  | 'true_false'
  | 'visual_identify'
  | 'slider_experiment';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  prompt: string;
  explanation: string; // Shown after answering or as pedagogical hint
  hint: string;
  visualType: 'scissors' | 'intersecting_angles' | 'train_tracks' | 'coincident_lines' | 'three_lines_point' | 'three_lines_triangle' | 'three_lines_parallel' | 'parallel_transversal' | 'protractor_practice';
  visualData?: {
    angle1?: number;
    angle2?: number;
    targetAngle?: string;
    isRightAngle?: boolean;
    missingAngleLabel?: string;
    labels?: { [key: string]: string | number };
  };
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string | number; // For direct numerical input or true/false
  realLifeExample?: {
    title: string;
    description: string;
    icon: string;
  };
}

export interface Chapter {
  id: ChapterId;
  order: number;
  title: string;
  shortDesc: string;
  badgeTitle: string;
  badgeIcon: string;
  theoryPoints: {
    title: string;
    content: string;
    keyword: string;
  }[];
  questions: Question[];
}

export interface UserStats {
  score: number;
  stars: { [chapterId: string]: number };
  completedChapters: string[];
  unlockedBadges: string[];
  streak: number;
}
