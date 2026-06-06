import { AppNotification, PantryItem, Recipe, ShoppingItem } from '../models';

/**
 * Fecha ISO relativa a hoy. El diseño original congelaba "hoy" en 2025-05-25;
 * aquí los mocks se generan con los mismos offsets para reproducir
 * exactamente los estados visuales del Figma (alertas "Hoy", 1d, 2d, 3d...).
 */
function daysFromToday(offset: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Offsets respecto al "hoy" original (2025-05-25) del Figma
export function buildInitialPantry(): PantryItem[] {
  return [
    { id: 1, name: 'Leche entera', category: 'Lácteos', quantity: 2, unit: 'L', expiryDate: daysFromToday(2), location: 'Nevera' },
    { id: 2, name: 'Yogur natural', category: 'Lácteos', quantity: 4, unit: 'und', expiryDate: daysFromToday(1), location: 'Nevera' },
    { id: 3, name: 'Manzanas Fuji', category: 'Frutas', quantity: 6, unit: 'und', expiryDate: daysFromToday(7), location: 'Nevera' },
    { id: 4, name: 'Arroz integral', category: 'Cereales', quantity: 1, unit: 'kg', expiryDate: daysFromToday(204), location: 'Despensa' },
    { id: 5, name: 'Pechuga de pollo', category: 'Proteínas', quantity: 500, unit: 'g', expiryDate: daysFromToday(0), location: 'Congelador' },
    { id: 6, name: 'Queso parmesano', category: 'Lácteos', quantity: 200, unit: 'g', expiryDate: daysFromToday(16), location: 'Nevera' },
    { id: 7, name: 'Avena', category: 'Cereales', quantity: 800, unit: 'g', expiryDate: daysFromToday(148), location: 'Despensa' },
    { id: 8, name: 'Jugo de naranja', category: 'Bebidas', quantity: 1, unit: 'L', expiryDate: daysFromToday(3), location: 'Nevera' },
    { id: 9, name: 'Galletas integrales', category: 'Snacks', quantity: 1, unit: 'paq', expiryDate: daysFromToday(66), location: 'Despensa' },
    { id: 10, name: 'Salmón congelado', category: 'Proteínas', quantity: 400, unit: 'g', expiryDate: daysFromToday(68), location: 'Congelador' },
  ];
}

export function buildInitialShopping(): ShoppingItem[] {
  return [
    { id: 1, name: 'Tomates cherry', quantity: 500, unit: 'g', checked: false, category: 'Frutas' },
    { id: 2, name: 'Leche descremada', quantity: 2, unit: 'L', checked: false, category: 'Lácteos' },
    { id: 3, name: 'Pan integral', quantity: 1, unit: 'und', checked: true, category: 'Cereales' },
    { id: 4, name: 'Huevos orgánicos', quantity: 12, unit: 'und', checked: false, category: 'Proteínas' },
    { id: 5, name: 'Café molido', quantity: 250, unit: 'g', checked: true, category: 'Bebidas' },
    { id: 6, name: 'Mantequilla', quantity: 200, unit: 'g', checked: false, category: 'Lácteos' },
  ];
}

/** ISO de hace N minutos (las notificaciones envejecen de forma natural). */
function minutesAgo(min: number): string {
  return new Date(Date.now() - min * 60000).toISOString();
}

/**
 * 4 notificaciones iniciales (el globo rojo del Figma muestra "4"),
 * adaptadas a la temática real de la app: despensa, vencimientos,
 * recetas y lista de compras.
 */
export function buildInitialNotifications(): AppNotification[] {
  return [
    {
      id: 'n1',
      type: 'expiry',
      title: 'Producto vence hoy',
      message: 'La pechuga de pollo vence hoy. ¡Úsala pronto o muévela al congelador!',
      read: false,
      createdAt: minutesAgo(30),
      targetId: '5', // id del item en la despensa
      detailTitle: 'Pechuga de pollo',
      detailDescription:
        'Este producto de tu despensa vence hoy. Revísalo y decide si lo usas en una receta o lo congelas para extender su vida útil.',
    },
    {
      id: 'n2',
      type: 'expiry',
      title: 'Vencimientos próximos',
      message: 'Yogur natural y leche entera vencen en los próximos 2 días.',
      read: false,
      createdAt: minutesAgo(2 * 60),
      detailTitle: 'Productos por vencer',
      detailDescription:
        'Estos productos de tu despensa vencen pronto. Priorízalos en tus próximas comidas para evitar desperdicios.',
    },
    {
      id: 'n3',
      type: 'recipe',
      title: 'Receta sugerida',
      message: 'Tienes todo para preparar Bowl de Yogur con Avena. ¡Aprovecha tu yogur antes de que venza!',
      read: false,
      createdAt: minutesAgo(5 * 60),
      targetId: '2', // id de la receta
      detailTitle: 'Bowl de Yogur con Avena',
      detailDescription:
        'Con los ingredientes que tienes hoy puedes preparar esta receta completa, y de paso aprovechas el yogur que está por vencer.',
    },
    {
      id: 'n4',
      type: 'shopping',
      title: 'Lista de compras pendiente',
      message: 'Tienes 4 productos por comprar. ¡No olvides la leche descremada!',
      read: false,
      createdAt: minutesAgo(26 * 60),
      detailTitle: 'Tu lista de compras',
      detailDescription:
        'Estos son los productos que aún tienes pendientes por comprar en tu próxima visita al mercado.',
    },
  ];
}

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Pollo con Arroz',
    description: 'Clásico pollo con arroz cremoso',
    time: 35,
    servings: 4,
    difficulty: 'Fácil',
    ingredients: ['pollo', 'arroz', 'leche', 'queso'],
    instructions: [
      'Cocina el pollo en trozos con sal y pimienta',
      'Prepara el arroz según las instrucciones del paquete',
      'Mezcla con queso y leche para crear una textura cremosa',
      'Sirve caliente y disfruta',
    ],
    category: 'Almuerzo',
  },
  {
    id: 2,
    name: 'Bowl de Yogur con Avena',
    description: 'Desayuno saludable y energético',
    time: 10,
    servings: 2,
    difficulty: 'Fácil',
    ingredients: ['yogur', 'avena', 'manzanas'],
    instructions: [
      'Coloca yogur natural en un bowl',
      'Agrega avena y mezcla bien',
      'Corta las manzanas en cubos pequeños',
      'Decora por encima y sirve frío',
    ],
    category: 'Desayuno',
  },
  {
    id: 3,
    name: 'Salmón Glaseado',
    description: 'Salmón con glaseado dulce',
    time: 25,
    servings: 2,
    difficulty: 'Media',
    ingredients: ['salmón'],
    instructions: [
      'Precalienta el horno a 200°C',
      'Coloca el salmón en una bandeja',
      'Glasea con tu salsa favorita',
      'Hornea por 15-20 minutos hasta que esté cocido',
    ],
    category: 'Cena',
  },
  {
    id: 4,
    name: 'Smoothie de Frutas',
    description: 'Bebida refrescante y nutritiva',
    time: 5,
    servings: 2,
    difficulty: 'Fácil',
    ingredients: ['manzanas', 'yogur', 'leche'],
    instructions: [
      'Lava y corta las manzanas',
      'Coloca en la licuadora con yogur y leche',
      'Licúa hasta obtener consistencia suave',
      'Sirve inmediatamente',
    ],
    category: 'Snack',
  },
  {
    id: 5,
    name: 'Avena con Leche',
    description: 'Desayuno clásico reconfortante',
    time: 15,
    servings: 2,
    difficulty: 'Fácil',
    ingredients: ['avena', 'leche', 'manzanas'],
    instructions: [
      'Hierve la leche en una olla',
      'Agrega la avena y cocina a fuego lento',
      'Corta manzanas en trozos',
      'Sirve la avena caliente con manzanas por encima',
    ],
    category: 'Desayuno',
  },
  {
    id: 6,
    name: 'Galletas con Queso',
    description: 'Snack rápido y delicioso',
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    ingredients: ['galletas', 'queso'],
    instructions: [
      'Coloca las galletas en un plato',
      'Corta el queso en láminas delgadas',
      'Coloca el queso sobre las galletas',
      'Sirve y disfruta',
    ],
    category: 'Snack',
  },
];
