interface ContactMessage {
  id?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  status: "pending" | "responded" | "closed";
  createdAt?: string;
  updatedAt?: string;
}

export type { ContactMessage };
