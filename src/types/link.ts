export type PublicLinkInfo = {
  id?: string;
  title: string;
  url: string;
  categoryId?: string | null;
  active: boolean;
};

export type Link = PublicLinkInfo & {
  userId: string;
  order?: number | null;
  deleted: boolean;
};
