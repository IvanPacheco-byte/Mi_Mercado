import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { PantryItem } from '../../models';
import { PantryService } from '../../services/pantry.service';
import { CATEGORY_CLASSES, CATEGORY_ICONS, getDaysUntilExpiry } from '../../shared/category-utils';
import { ExpiryBadgeComponent } from '../../shared/components/expiry-badge/expiry-badge.component';

interface ExpirySection {
  title: string;
  accent: string;
  items: PantryItem[];
}

@Component({
  selector: 'app-expiry',
  templateUrl: './expiry.page.html',
  styleUrls: ['./expiry.page.scss'],
  imports: [LucideAngularModule, ExpiryBadgeComponent],
})
export class ExpiryPage {
  readonly pantry = inject(PantryService);

  readonly catIcons = CATEGORY_ICONS;
  readonly catClasses = CATEGORY_CLASSES;
  readonly getDays = getDaysUntilExpiry;

  readonly attentionCount = computed(() => {
    const items = this.pantry.items();
    const expired = items.filter((i) => getDaysUntilExpiry(i.expiryDate) < 0).length;
    const urgent = items.filter((i) => {
      const d = getDaysUntilExpiry(i.expiryDate);
      return d >= 0 && d <= 2;
    }).length;
    return expired + urgent;
  });

  readonly sections = computed<ExpirySection[]>(() => {
    const sorted = [...this.pantry.items()].sort(
      (a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate),
    );
    const expired = sorted.filter((i) => getDaysUntilExpiry(i.expiryDate) < 0);
    const urgent = sorted.filter((i) => {
      const d = getDaysUntilExpiry(i.expiryDate);
      return d >= 0 && d <= 2;
    });
    const soon = sorted.filter((i) => {
      const d = getDaysUntilExpiry(i.expiryDate);
      return d >= 3 && d <= 7;
    });
    const ok = sorted.filter((i) => getDaysUntilExpiry(i.expiryDate) > 7);

    return [
      { title: 'Vencidos', accent: 'dot-red', items: expired },
      { title: 'Urgente (0-2 días)', accent: 'dot-orange', items: urgent },
      { title: 'Próximos (3-7 días)', accent: 'dot-yellow', items: soon },
      { title: 'En buen estado', accent: 'dot-primary', items: ok },
    ].filter((s) => s.items.length > 0);
  });
}
