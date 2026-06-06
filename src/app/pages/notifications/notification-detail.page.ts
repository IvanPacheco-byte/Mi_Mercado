import { Component, computed, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeft, Clock, LucideAngularModule, Users } from 'lucide-angular';
import { PantryItem, Recipe } from '../../models';
import { NotificationService, relativeTime } from '../../services/notification.service';
import { PantryService } from '../../services/pantry.service';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingService } from '../../services/shopping.service';
import {
  CATEGORY_CLASSES,
  CATEGORY_ICONS,
  DIFFICULTY_CLASSES,
  getDaysUntilExpiry,
} from '../../shared/category-utils';
import { NOTIFICATION_TYPE_META } from '../../shared/notification-utils';
import { ExpiryBadgeComponent } from '../../shared/components/expiry-badge/expiry-badge.component';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
  imports: [LucideAngularModule, ExpiryBadgeComponent],
})
export class NotificationDetailPage {
  /** id de la ruta /notificaciones/:id (withComponentInputBinding) */
  readonly id = input.required<string>();

  private router = inject(Router);
  private notifications = inject(NotificationService);
  private pantry = inject(PantryService);
  private shopping = inject(ShoppingService);
  private recipes = inject(RecipeService);

  readonly BackIcon = ArrowLeft;
  readonly ClockIcon = Clock;
  readonly UsersIcon = Users;
  readonly typeMeta = NOTIFICATION_TYPE_META;
  readonly catIcons = CATEGORY_ICONS;
  readonly catClasses = CATEGORY_CLASSES;
  readonly difficultyClasses = DIFFICULTY_CLASSES;
  readonly relativeTime = relativeTime;
  readonly getDays = getDaysUntilExpiry;

  readonly notification = computed(() => this.notifications.getById(this.id()));

  /** Item de despensa relacionado (notificaciones de vencimiento con targetId). */
  readonly relatedPantryItem = computed<PantryItem | undefined>(() => {
    const n = this.notification();
    if (n?.type !== 'expiry' || !n.targetId) return undefined;
    return this.pantry.items().find((i) => i.id === Number(n.targetId));
  });

  /** Items por vencer (notificaciones de vencimiento sin targetId). */
  readonly expiringItems = computed(() => {
    const n = this.notification();
    if (n?.type !== 'expiry' || n.targetId) return [];
    return this.pantry.expiringSoon();
  });

  /** Receta relacionada. */
  readonly relatedRecipe = computed<Recipe | undefined>(() => {
    const n = this.notification();
    if (n?.type !== 'recipe' || !n.targetId) return undefined;
    return this.recipes.recipes.find((r) => r.id === Number(n.targetId));
  });

  /** Pendientes de la lista de compras. */
  readonly pendingShopping = computed(() => {
    const n = this.notification();
    return n?.type === 'shopping' ? this.shopping.pending() : [];
  });

  constructor() {
    // Al abrir el detalle, la notificación se marca como leída
    // y el contador de la campana se actualiza solo (signals).
    effect(() => {
      const n = this.notifications.getById(this.id());
      if (n && !n.read) this.notifications.markAsRead(n.id);
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/notificaciones');
  }

  goCta(): void {
    const n = this.notification();
    if (n) this.router.navigateByUrl(this.typeMeta[n.type].ctaRoute);
  }
}
