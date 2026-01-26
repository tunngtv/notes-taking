export type Note = {
  id: string;
  title: string;
  content: string;
  tags: {
    title: string;
    color: string;
  }[];
  createdAt: number;
  updatedAt: number;
  user_id?: string;
};
