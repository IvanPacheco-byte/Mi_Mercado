import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { Category, PantryItem, PantryLocation, ShoppingItem } from '../../../models';
import { CATEGORIES } from '../../category-utils';

export type AddItemPayload = Omit<PantryItem, 'id'> | Omit<ShoppingItem, 'id'>;

/**
 * Sheet modal "Agregar alimento" / "Agregar al carrito"
 * (réplica del AddItemModal del diseño).
 */
@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss'],
  imports: [FormsModule, LucideAngularModule],
})
export class AddItemModalComponent {
  readonly mode = input.required<'pantry' | 'shopping'>();
  readonly closed = output<void>();
  readonly added = output<AddItemPayload>();

  readonly XIcon = X;
  readonly categories = CATEGORIES;
  readonly units = ['und', 'L', 'ml', 'kg', 'g', 'paq'];
  readonly locations: PantryLocation[] = ['Nevera', 'Despensa', 'Congelador'];

  name = '';
  quantity = '1';
  unit = 'und';
  readonly category = signal<Category>('Frutas');
  expiry = this.defaultExpiry();
  readonly location = signal<PantryLocation>('Nevera');

  private defaultExpiry(): string {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  submit(): void {
    if (!this.name.trim()) return;
    if (this.mode() === 'pantry') {
      this.added.emit({
        name: this.name,
        quantity: Number(this.quantity),
        unit: this.unit,
        category: this.category(),
        expiryDate: this.expiry,
        location: this.location(),
      });
    } else {
      this.added.emit({
        name: this.name,
        quantity: Number(this.quantity),
        unit: this.unit,
        category: this.category(),
        checked: false,
      });
    }
    this.closed.emit();
  }
}
