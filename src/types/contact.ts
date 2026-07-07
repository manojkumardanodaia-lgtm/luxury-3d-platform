export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;

  status: "New" | "Read" | "Replied";

  createdAt: string;
}