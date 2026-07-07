export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;

  thumbnail?: string;
  images?: string[];

  modelUrl?: string;
  videoUrl?: string;

  software?: string[];
  tags?: string[];

  featured?: boolean;
  status?: "Draft" | "Published";

  createdAt?: string;
  updatedAt?: string;
}