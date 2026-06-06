import { Component, input, output } from '@angular/core';
import { ChefHat, ChevronRight, Clock, LucideAngularModule, Users } from 'lucide-angular';
import { Recipe } from '../../../models';
import { DIFFICULTY_CLASSES } from '../../../shared/category-utils';

/** Card de receta con meta, dificultad y barra de % de match. */
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  imports: [LucideAngularModule],
})
export class RecipeCardComponent {
  readonly recipe = input.required<Recipe>();
  readonly score = input.required<number>();
  readonly available = input.required<number>();
  readonly clicked = output<void>();

  readonly ChefHatIcon = ChefHat;
  readonly ClockIcon = Clock;
  readonly UsersIcon = Users;
  readonly ChevronRightIcon = ChevronRight;
  readonly difficultyClasses = DIFFICULTY_CLASSES;

  tone(): string {
    const s = this.score();
    return s === 100 ? 'tone-green' : s >= 50 ? 'tone-yellow' : 'tone-muted';
  }
}
