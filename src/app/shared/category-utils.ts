import { Apple, Coffee, Cookie, Fish, Milk, Wheat } from 'lucide-angular';
import { Category, Difficulty } from '../models';

export const CATEGORIES: Category[] = ['Lácteos', 'Frutas', 'Cereales', 'Proteínas', 'Bebidas', 'Snacks'];

// Iconos Lucide por categoría (idénticos al diseño)
export const CATEGORY_ICONS: Record<Category, any> = {
  'Lácteos': Milk,
  'Frutas': Apple,
  'Cereales': Wheat,
  'Proteínas': Fish,
  'Bebidas': Coffee,
  'Snacks': Cookie,
};

// Clases CSS de color por categoría (bg-X-100 / text-X-700)
export const CATEGORY_CLASSES: Record<Category, string> = {
  'Lácteos': 'cat-lacteos',
  'Frutas': 'cat-frutas',
  'Cereales': 'cat-cereales',
  'Proteínas': 'cat-proteinas',
  'Bebidas': 'cat-bebidas',
  'Snacks': 'cat-snacks',
};

export const DIFFICULTY_CLASSES: Record<Difficulty, string> = {
  'Fácil': 'diff-facil',
  'Media': 'diff-media',
  'Difícil': 'diff-dificil',
};

/** Días hasta el vencimiento contando desde hoy (medianoche local). */
export function getDaysUntilExpiry(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(`${dateStr}T00:00:00`);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
