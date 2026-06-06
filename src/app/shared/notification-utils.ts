import { Bell, Calendar, ChefHat, ShoppingCart } from 'lucide-angular';
import { NotificationType } from '../models';

interface NotificationTypeMeta {
  icon: any;
  /** clase de color del tile (reutiliza la paleta de la app) */
  tileClass: string;
  /** etiqueta corta del tipo */
  label: string;
  /** CTA del detalle */
  ctaText: string;
  ctaRoute: string;
}

/** Apariencia y acción por tipo de notificación (coherente con el diseño). */
export const NOTIFICATION_TYPE_META: Record<NotificationType, NotificationTypeMeta> = {
  expiry: {
    icon: Calendar,
    tileClass: 'tile-orange',
    label: 'Vencimiento',
    ctaText: 'Ver vencimientos',
    ctaRoute: '/vencimientos',
  },
  recipe: {
    icon: ChefHat,
    tileClass: 'tile-green',
    label: 'Receta',
    ctaText: 'Ver recetas',
    ctaRoute: '/recetas',
  },
  shopping: {
    icon: ShoppingCart,
    tileClass: 'tile-blue',
    label: 'Compras',
    ctaText: 'Ver lista de compras',
    ctaRoute: '/compras',
  },
  general: {
    icon: Bell,
    tileClass: 'tile-muted',
    label: 'General',
    ctaText: 'Ir al inicio',
    ctaRoute: '/inicio',
  },
};
