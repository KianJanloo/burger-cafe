interface Comment {
  id?: number;
  content: string;
  rating: number;
  authorName: string;
  authorJob: string;
  authorImage?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type { Comment };
