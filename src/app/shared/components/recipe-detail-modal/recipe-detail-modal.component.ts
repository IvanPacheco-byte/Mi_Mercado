import { Component, input, output } from '@angular/core';
import { Check, Clock, LucideAngularModule, Users, X } from 'lucide-angular';
import { Recipe, RecipeMatch } from '../../../models';
import { DIFFICULTY_CLASSES } from '../../category-utils';

/**
 * Sheet modal de detalle de receta con % de match, ingredientes,
 * faltantes y preparación (réplica del RecipeDetailModal del diseño).
 */
@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.scss'],
  imports: [LucideAngularModule],
})
export class RecipeDetailModalComponent {
  readonly recipe = input.required<Recipe>();
  readonly matchData = input.required<RecipeMatch>();
  readonly closed = output<void>();

  readonly XIcon = X;
  readonly ClockIcon = Clock;
  readonly UsersIcon = Users;
  readonly CheckIcon = Check;
  readonly difficultyClasses = DIFFICULTY_CLASSES;

  matchTone(): string {
    const s = this.matchData().score;
    return s === 100 ? 'match-green' : s >= 50 ? 'match-yellow' : 'match-muted';
  }

  hasIngredient(ingredient: string): boolean {
    return !this.matchData().missing.includes(ingredient);
  }
}
