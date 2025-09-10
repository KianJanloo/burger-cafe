interface Reservation {
  id?: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  date: string;
  time: string;
  customerCount: number;
  specialRequest?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt?: string;
  updatedAt?: string;
}

export type { Reservation };
