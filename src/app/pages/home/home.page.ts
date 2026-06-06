import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertTriangle,
  Bell,
  Calendar,
  LucideAngularModule,
  Refrigerator,
  ShoppingCart,
} from 'lucide-angular';
import { NotificationService } from '../../services/notification.service';
import { PantryService } from '../../services/pantry.service';
import { ShoppingService } from '../../services/shopping.service';
import { CATEGORY_CLASSES, CATEGORY_ICONS, getDaysUntilExpiry } from '../../shared/category-utils';
import { ExpiryBadgeComponent } from '../../shared/components/expiry-badge/expiry-badge.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [LucideAngularModule, ExpiryBadgeComponent],
})
export class HomePage {
  readonly pantry = inject(PantryService);
  readonly shopping = inject(ShoppingService);
  readonly notifications = inject(NotificationService);
  private router = inject(Router);

  readonly BellIcon = Bell;
  readonly FridgeIcon = Refrigerator;
  readonly AlertIcon = AlertTriangle;
  readonly CartIcon = ShoppingCart;
  readonly CalendarIcon = Calendar;

  readonly catIcons = CATEGORY_ICONS;
  readonly catClasses = CATEGORY_CLASSES;
  readonly getDays = getDaysUntilExpiry;

  readonly alertCount = computed(() => this.pantry.expiringSoon().length + this.pantry.expired().length);
  readonly previewItems = computed(() => this.shopping.pending().slice(0, 3));
  readonly pendingCount = computed(() => this.shopping.pending().length);

  goNotifications(): void {
    this.router.navigateByUrl('/notificaciones');
  }
}
