export interface Gadget {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  link?: string;
}

export const GADGETS_DATA: Gadget[] = [
  {
    id: 1,
    name: "Автокормушка с AI-камерой (Petkit YumShare)",
    category: "Кормление",
    price: "14 990 ₽",
    image: "https://images.unsplash.com/photo-1583337130317-856a577e617a?auto=format&fit=crop&q=80&w=800",
    description: "Full HD камера с нейросетью распознает активность питомца, записывает видео приемов пищи и точно дозирует порции.",
    link: "#"
  },
  {
    id: 2,
    name: "Умный фонтан (PETLIBRO Dockstream)",
    category: "Здоровье",
    price: "5 200 ₽",
    image: "https://images.unsplash.com/photo-1516734212186-a72e8b7f7542?auto=format&fit=crop&q=80&w=800",
    description: "Многослойная фильтрация и бесшумный насос. Отслеживает объем выпитой воды для каждого питомца через RFID-метки.",
    link: "#"
  },
  {
    id: 3,
    name: "Самоочищающийся лоток (PETKIT Pura Max)",
    category: "Гигиена",
    price: "29 900 ₽",
    image: "https://images.unsplash.com/photo-1591769158564-600774599781?auto=format&fit=crop&q=80&w=800",
    description: "Автоматическая уборка отходов, встроенные датчики веса и безопасности, а также система автоматической дезодорации.",
    link: "#"
  },
  {
    id: 4,
    name: "GPS-трекер (Tractive Smart GPS)",
    category: "Безопасность",
    price: "6 800 ₽",
    image: "https://images.unsplash.com/photo-1541781774459-bb6f70a3f4bc?auto=format&fit=crop&q=80&w=800",
    description: "Спутниковое отслеживание в реальном времени, функция «виртуального забора» и мониторинг ежедневной физической активности.",
    link: "#"
  }
];
