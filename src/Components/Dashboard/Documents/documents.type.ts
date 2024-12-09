export type Document = {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
};

export type DocumentCardProps = {
  doc: Document;
  handleNavigate: (id: string) => void;
};
