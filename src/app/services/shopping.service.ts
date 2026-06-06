import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { buildInitialShopping } from '../data/mock-data';
import { ShoppingItem } from '../models';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  private storage = inject(StorageService);

  /** Lista de compras: se siembra con mocks solo la primera vez. */
  readonly items = signal<ShoppingItem[]>(this.storage.get<ShoppingItem[]>('shopping') ?? buildInitialShopping());

  readonly pending = computed(() => this.items().filter((i) => !i.checked));
  readonly done = computed(() => this.items().filter((i) => i.checked));
  readonly progress = computed(() => {
    const total = this.items().length;
    return total > 0 ? Math.round((this.done().length / total) * 100) : 0;
  });

  constructor() {
    effect(() => this.storage.set('shopping', this.items()));
  }

  add(item: Omit<ShoppingItem, 'id'>): void {
    this.items.update((prev) => [...prev, { ...item, id: Date.now() }]);
  }

  toggle(id: number): void {
    this.items.update((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  }

  remove(id: number): void {
    this.items.update((prev) => prev.filter((i) => i.id !== id));
  }
}
