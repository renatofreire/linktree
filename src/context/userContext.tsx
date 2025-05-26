"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  CategoryFormData,
  PublicCategoryInfo,
  PublicLinkInfo,
  PublicUserInfo,
} from "@/types";

type ContextData = {
  user: PublicUserInfo | null;
  categories: PublicCategoryInfo[] | null;
  links: PublicLinkInfo[] | null;
};

type UserContextType = ContextData & {
  setUser: (user: PublicUserInfo | null) => void;
  setCategories: (categories: PublicCategoryInfo[] | null) => void;
  removeCategory: (categoryId: string) => void;
  updateCategory: (category: CategoryFormData) => void;
  addCategory: (category: PublicCategoryInfo) => void;
  addLink: (link: PublicLinkInfo) => void;
  removeLink: (link: PublicLinkInfo) => void;
  updateLink: (link: PublicLinkInfo) => void;
};

type ProviderProps = {
  children: ReactNode;
  data: ContextData;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children, data }: ProviderProps) {
  const [user, setUser] = useState<PublicUserInfo | null>(data.user);
  const [categories, setCategories] = useState<PublicCategoryInfo[] | null>(
    data.categories
  );

  const [links, setLinks] = useState<PublicLinkInfo[] | null>(data.links);

  const removeCategory = useCallback((categoryId: string) => {
    setCategories((prevCategories) => {
      if (!prevCategories) return null;
      return prevCategories.filter((category) => category.id !== categoryId);
    });
  }, []);

  const updateCategory = useCallback((updatedCategory: CategoryFormData) => {
    setCategories((prevCategories) => {
      if (!prevCategories) return null;
      return prevCategories.map((category) => {
        return category.id === updatedCategory.id
          ? {
              ...category,
              title: updatedCategory.title,
              active: !!updatedCategory.active,
            }
          : category;
      });
    });
  }, []);

  const addCategory = useCallback((newCategory: PublicCategoryInfo) => {
    setCategories((prevCategories) => {
      if (!prevCategories) return null;
      if (!newCategory || !newCategory.id) return prevCategories;
      return [...prevCategories, newCategory];
    });
  }, []);

  const addLink = useCallback((newLink: PublicLinkInfo) => {
    setLinks((prevLinks) => {
      if (!prevLinks) return null;
      return [...prevLinks, newLink];
    });
  }, []);

  const removeLink = useCallback((removedLink: PublicLinkInfo) => {
    setLinks((prevLinks) => {
      if (!prevLinks) return null;
      return prevLinks.filter((link) => link.id !== removedLink.id);
    });
  }, []);

  const updateLink = useCallback((updatedLink: PublicLinkInfo) => {
    setLinks((prevLinks) => {
      if (!prevLinks) return null;
      return prevLinks.map((link) => {
        return link.id === updatedLink.id
          ? {
              ...link,
              title: updatedLink.title,
              active: !!updatedLink.active,
              url: updatedLink.url,
              categoryId: updatedLink.categoryId,
            }
          : link;
      });
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        categories,
        setCategories,
        removeCategory,
        updateCategory,
        addCategory,
        links,
        addLink,
        removeLink,
        updateLink,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
