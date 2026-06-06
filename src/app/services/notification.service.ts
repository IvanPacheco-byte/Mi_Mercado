import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { buildInitialNotifications } from '../data/mock-data';
import { AppNotification } from '../models';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private storage = inject(StorageService);

  /** Notificaciones: se siembran las 4 iniciales solo la primera vez. */
  readonly notifications = signal<AppNotification[]>(
    this.storage.get<AppNotification[]>('notifications') ?? buildInitialNotifications(),
  );

  /** Cantidad de no leídas: alimenta el globo rojo de la campana. */
  readonly unreadCount = computed(() => this.notifications().filter((n) => !n.read).length);

  /** Más recientes primero. */
  readonly sorted = computed(() =>
    [...this.notifications()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  );

  constructor() {
    effect(() => this.storage.set('notifications', this.notifications()));
  }

  getById(id: string): AppNotification | undefined {
    return this.notifications().find((n) => n.id === id);
  }

  markAsRead(id: string): void {
    this.notifications.update((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllAsRead(): void {
    this.notifications.update((prev) => prev.map((n) => ({ ...n, read: true })));
  }
}

/** Tiempo relativo corto: "Ahora", "Hace 30 min", "Hace 2 h", "Ayer", "Hace 3 días". */
export function relativeTime(iso: string): string {
  const diffMin = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMin < 1) return 'Ahora';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  const h = Math.floor(diffMin / 60);
  if (h < 24) return `Hace ${h} h`;
  const d = Math.floor(h / 24);
  return d === 1 ? 'Ayer' : `Hace ${d} días`;
}
