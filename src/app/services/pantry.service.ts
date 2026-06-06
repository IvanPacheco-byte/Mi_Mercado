import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { buildInitialPantry } from '../data/mock-data';
import { Category, PantryItem } from '../models';
import { getDaysUntilExpiry } from '../shared/category-utils';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class PantryService {
  private storage = inject(StorageService);

  /** Estado de la despensa: se siembra con mocks solo la primera vez. */
  readonly items = signal<PantryItem[]>(this.storage.get<PantryItem[]>('pantry') ?? buildInitialPantry());

  /** Por vencer (0-3 días), como en el Home del diseño. */
  readonly expiringSoon = computed(() =>
    this.items().filter((i) => {
      const d = getDaysUntilExpiry(i.expiryDate);
      return d >= 0 && d <= 3;
    }),
  );

  /** Vencidos. */
  readonly expired = computed(() => this.items().filter((i) => getDaysUntilExpiry(i.expiryDate) < 0));

  /** Conteo de items por categoría. */
  readonly categoryCount = computed(() => {
    const count: Partial<Record<Category, number>> = {};
    for (const i of this.items()) {
      count[i.category] = (count[i.category] ?? 0) + 1;
    }
    return Object.entries(count) as [Category, number][];
  });

  constructor() {
    effect(() => this.storage.set('pantry', this.items()));
  }

  add(item: Omit<PantryItem, 'id'>): void {
    this.items.update((prev) => [...prev, { ...item, id: Date.now() }]);
  }

  remove(id: number): void {
    this.items.update((prev) => prev.filter((i) => i.id !== id));
  }
}
