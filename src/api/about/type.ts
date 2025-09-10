interface Story {
  id?: number;
  story: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TeamMember {
  id?: number;
  name: string;
  position: string;
  experience: number;
  skills: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type { Story, TeamMember };
