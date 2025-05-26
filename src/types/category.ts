export type CategoryFormData = {
  id?: string;
  title: string;
  active: boolean;
};

export type PublicCategoryInfo = {
  id: string;
  title: string;
  active: boolean;
};

export type Category = PublicCategoryInfo & {
  userId: string;
  order?: number | null;
  deleted: boolean;
};
