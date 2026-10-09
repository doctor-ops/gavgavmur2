/// <reference types="vite/client" />

declare module 'virtual:petfood-index' {
  const foods: Array<{
    id: string;
    brand: string;
    name: string;
    line?: string;
    search_tags?: string;
  }>;
  export default foods;
}

declare module 'virtual:petfood-compositions' {
  const compositions: Record<string, string>;
  export default compositions;
}
