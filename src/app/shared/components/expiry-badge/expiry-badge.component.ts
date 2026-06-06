import { Component, computed, input } from '@angular/core';

/**
 * Badge de vencimiento: Vencido / Hoy / Nd con colores por rango
 * (idéntico al ExpiryBadge del diseño).
 */
@Component({
  selector: 'app-expiry-badge',
  template: `<span [class]="'badge ' + tone()">{{ label() }}</span>`,
  styles: [
    `
      .badge {
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 9999px;
        white-space: nowrap;
      }

      .badge-red {
        background: var(--red-100);
        color: var(--red-700);
      }

      .badge-orange {
        background: var(--orange-100);
        color: var(--orange-700);
      }

      .badge-yellow {
        background: var(--yellow-100);
        color: var(--yellow-700);
      }

      .badge-ok {
        background: var(--secondary);
        color: var(--primary);
      }
    `,
  ],
})
export class ExpiryBadgeComponent {
  readonly days = input.required<number>();

  readonly label = computed(() => {
    const d = this.days();
    if (d < 0) return 'Vencido';
    if (d === 0) return 'Hoy';
    return `${d}d`;
  });

  readonly tone = computed(() => {
    const d = this.days();
    if (d <= 0) return 'badge-red';
    if (d <= 2) return 'badge-orange';
    if (d <= 7) return 'badge-yellow';
    return 'badge-ok';
  });
}
