interface FAQ {
  id?: number;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type { FAQ };
