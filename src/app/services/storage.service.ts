import { Injectable } from '@angular/core';

/**
 * Capa de persistencia local: wrapper tipado sobre localStorage.
 * Todo el almacenamiento vive dentro de la app (sin backend).
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly prefix = 'mi-mercado.';

  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw === null ? null : (JSON.parse(raw) as T);
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
      // almacenamiento lleno o no disponible: la app sigue funcionando en memoria
    }
  }
}
