import { Component, inject, signal } from '@angular/core';
import { Check, LucideAngularModule, Plus, Trash2 } from 'lucide-angular';
import { ShoppingItem } from '../../models';
import { ShoppingService } from '../../services/shopping.service';
import { CATEGORY_CLASSES, CATEGORY_ICONS } from '../../shared/category-utils';
import {
  AddItemModalComponent,
  AddItemPayload,
} from '../../shared/components/add-item-modal/add-item-modal.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
  imports: [LucideAngularModule, AddItemModalComponent],
})
export class ShoppingPage {
  readonly shopping = inject(ShoppingService);

  readonly PlusIcon = Plus;
  readonly CheckIcon = Check;
  readonly TrashIcon = Trash2;

  readonly catIcons = CATEGORY_ICONS;
  readonly catClasses = CATEGORY_CLASSES;

  readonly showModal = signal(false);

  onAdd(item: AddItemPayload): void {
    this.shopping.add(item as Omit<ShoppingItem, 'id'>);
  }
}
