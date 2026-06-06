import { Component, computed, inject, signal } from '@angular/core';
import { ChefHat, LucideAngularModule } from 'lucide-angular';
import { Recipe, RecipeCategory, RecipeMatch } from '../../models';
import { PantryService } from '../../services/pantry.service';
import { RecipeService } from '../../services/recipe.service';
import { RecipeDetailModalComponent } from '../../shared/components/recipe-detail-modal/recipe-detail-modal.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

interface ScoredRecipe extends RecipeMatch {
  recipe: Recipe;
}

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  imports: [LucideAngularModule, RecipeCardComponent, RecipeDetailModalComponent],
})
export class RecipesPage {
  private pantry = inject(PantryService);
  private recipeService = inject(RecipeService);

  readonly ChefHatIcon = ChefHat;

  readonly categories: (RecipeCategory | 'Todas')[] = ['Todas', 'Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Postre'];

  readonly filterCategory = signal<RecipeCategory | 'Todas'>('Todas');
  readonly selectedRecipe = signal<Recipe | null>(null);

  /** Recetas con puntaje de match, ordenadas de mayor a menor. */
  readonly scored = computed<ScoredRecipe[]>(() => {
    const pantryItems = this.pantry.items();
    return this.recipeService.recipes
      .map((recipe) => ({ recipe, ...this.recipeService.getRecipeMatch(recipe, pantryItems) }))
      .sort((a, b) => b.score - a.score);
  });

  readonly filtered = computed(() =>
    this.scored().filter(({ recipe }) => this.filterCategory() === 'Todas' || recipe.category === this.filterCategory()),
  );

  readonly perfectMatches = computed(() => this.filtered().filter(({ score }) => score === 100));
  readonly goodMatches = computed(() => this.filtered().filter(({ score }) => score >= 50 && score < 100));
  readonly partialMatches = computed(() => this.filtered().filter(({ score }) => score < 50));

  readonly selectedMatch = computed<RecipeMatch | null>(() => {
    const recipe = this.selectedRecipe();
    return recipe ? this.recipeService.getRecipeMatch(recipe, this.pantry.items()) : null;
  });
}
