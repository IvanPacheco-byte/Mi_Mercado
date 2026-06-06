import { Injectable } from '@angular/core';
import { RECIPES } from '../data/mock-data';
import { PantryItem, Recipe, RecipeMatch } from '../models';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  readonly recipes: Recipe[] = RECIPES;

  /**
   * Normaliza los nombres de la despensa para hacer match con los
   * ingredientes de las recetas (misma lógica del diseño original).
   */
  private normalizePantry(pantry: PantryItem[]): string[] {
    return pantry.map((item) =>
      item.name
        .toLowerCase()
        .replace(/\s+(entera|descremada|integral|natural|orgánico|congelado|fuji|parmesano|integrales)/g, '')
        .trim(),
    );
  }

  /** Calcula el % de ingredientes de la receta disponibles en la despensa. */
  getRecipeMatch(recipe: Recipe, pantry: PantryItem[]): RecipeMatch {
    const pantryIngredients = this.normalizePantry(pantry);
    let available = 0;
    const missing: string[] = [];

    for (const ingredient of recipe.ingredients) {
      const hasIngredient = pantryIngredients.some(
        (pantryItem) => pantryItem.includes(ingredient) || ingredient.includes(pantryItem),
      );
      if (hasIngredient) {
        available++;
      } else {
        missing.push(ingredient);
      }
    }

    const score = Math.round((available / recipe.ingredients.length) * 100);
    return { score, available, missing };
  }
}
