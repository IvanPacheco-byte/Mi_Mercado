// Modelos del dominio — copiados del diseño de Figma Make "Mi_Mercado"

export type Tab = 'inicio' | 'despensa' | 'vencimientos' | 'compras' | 'recetas';

export type Category = 'Lácteos' | 'Frutas' | 'Cereales' | 'Proteínas' | 'Bebidas' | 'Snacks';

export type PantryLocation = 'Nevera' | 'Despensa' | 'Congelador';

export interface PantryItem {
  id: number;
  name: string;
  category: Category;
  quantity: number;
  unit: string;
  expiryDate: string; // ISO yyyy-MM-dd
  location: PantryLocation;
}

export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  category: Category;
}

export type RecipeCategory = 'Desayuno' | 'Almuerzo' | 'Cena' | 'Postre' | 'Snack';

export type Difficulty = 'Fácil' | 'Media' | 'Difícil';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  time: number; // minutos
  servings: number;
  difficulty: Difficulty;
  ingredients: string[]; // nombres simples para hacer match con la despensa
  instructions: string[];
  category: RecipeCategory;
}

export interface RecipeMatch {
  score: number;
  available: number;
  missing: string[];
}

export type NotificationType = 'expiry' | 'recipe' | 'shopping' | 'general';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string; // ISO
  /** Referencia al elemento relacionado (id de producto/receta) */
  targetId?: string;
  detailTitle?: string;
  detailDescription?: string;
}
