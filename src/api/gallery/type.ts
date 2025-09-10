interface GalleryCategory {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GalleryItem {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type { GalleryCategory, GalleryItem };
