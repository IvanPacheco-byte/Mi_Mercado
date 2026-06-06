import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertTriangle,
  ChefHat,
  Home,
  LucideAngularModule,
  Package,
  ShoppingCart,
} from 'lucide-angular';

interface NavItem {
  path: string;
  label: string;
  icon: any;
}

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  imports: [LucideAngularModule],
})
export class BottomNavComponent {
  private router = inject(Router);

  readonly items: NavItem[] = [
    { path: '/inicio', label: 'Inicio', icon: Home },
    { path: '/despensa', label: 'Despensa', icon: Package },
    { path: '/vencimientos', label: 'Vence', icon: AlertTriangle },
    { path: '/compras', label: 'Compras', icon: ShoppingCart },
    { path: '/recetas', label: 'Recetas', icon: ChefHat },
  ];

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  go(path: string): void {
    this.router.navigateByUrl(path);
  }
}
