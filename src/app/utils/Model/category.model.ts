
  export interface CategoryList {
    id: number;
    categoryName: string;
    imageUrl: string;
    group: Group[];
  }
  
  interface Group {
    id: number;
    displayName: string;
    imageUrl: string;
  }