import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Package, Plus, Search, Trash2 } from 'lucide-angular';
import { Category, PantryItem, PantryLocation } from '../../models';
import { PantryService } from '../../services/pantry.service';
import { CATEGORY_CLASSES, CATEGORY_ICONS, getDaysUntilExpiry } from '../../shared/category-utils';
import {
  AddItemModalComponent,
  AddItemPayload,
} from '../../shared/components/add-item-modal/add-item-modal.component';
import { ExpiryBadgeComponent } from '../../shared/components/expiry-badge/expiry-badge.component';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.page.html',
  styleUrls: ['./pantry.page.scss'],
  imports: [FormsModule, LucideAngularModule, ExpiryBadgeComponent, AddItemModalComponent],
})
export class PantryPage {
  readonly pantry = inject(PantryService);

  readonly PlusIcon = Plus;
  readonly SearchIcon = Search;
  readonly TrashIcon = Trash2;
  readonly PackageIcon = Package;

  readonly catIcons = CATEGORY_ICONS;
  readonly catClasses = CATEGORY_CLASSES;
  readonly getDays = getDaysUntilExpiry;

  readonly categories: (Category | 'Todos')[] = ['Todos', 'Lácteos', 'Frutas', 'Cereales', 'Proteínas', 'Bebidas', 'Snacks'];
  readonly locations: (PantryLocation | 'Todos')[] = ['Todos', 'Nevera', 'Despensa', 'Congelador'];

  readonly search = signal('');
  readonly filterCat = signal<Category | 'Todos'>('Todos');
  readonly filterLoc = signal<PantryLocation | 'Todos'>('Todos');
  readonly showModal = signal(false);

  readonly filtered = computed(() =>
    this.pantry.items().filter((i) => {
      const matchSearch = i.name.toLowerCase().includes(this.search().toLowerCase());
      const matchCat = this.filterCat() === 'Todos' || i.category === this.filterCat();
      const matchLoc = this.filterLoc() === 'Todos' || i.location === this.filterLoc();
      return matchSearch && matchCat && matchLoc;
    }),
  );

  onAdd(item: AddItemPayload): void {
    this.pantry.add(item as Omit<PantryItem, 'id'>);
  }
}
