import db from "@/lib/db";
import { PublicLinkInfo } from "@/types";
import { getCurrentSession } from "./user";

export async function createLink(
  link: PublicLinkInfo
): Promise<PublicLinkInfo> {
  const { userId } = await getCurrentSession();

  return await db.link.create({
    data: {
      title: link.title,
      url: link.url,
      categoryId: link.categoryId,
      userId,
      active: link.active,
    },
  });
}

export async function deleteLink(linkId: string): Promise<PublicLinkInfo> {
  await getCurrentSession();

  return await db.link.update({
    data: {
      deleted: true,
    },
    where: {
      id: linkId,
    },
  });
}

export async function updateLink(
  link: PublicLinkInfo
): Promise<PublicLinkInfo> {
  await getCurrentSession();

  return await db.link.update({
    data: {
      title: link.title,
      url: link.url,
      active: link.active,
      categoryId: link.categoryId,
    },
    where: {
      id: link.id,
    },
  });
}

export async function getAllLinks(): Promise<PublicLinkInfo[] | null> {
  const { userId } = await getCurrentSession();
  const links = await db.link.findMany({
    where: {
      userId,
      deleted: false,
    },
    orderBy: {
      order: "asc",
    },
  });

  return links?.map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    active: link.active,
    order: link.order,
    categoryId: link.categoryId,
  }));
}

export async function findLinksByUserName(
  userName: string
): Promise<PublicLinkInfo[] | null> {
  const links = await db.link.findMany({
    where: {
      user: {
        userName: userName,
      },
      deleted: false,
      active: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return links?.map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    active: link.active,
    order: link.order,
    categoryId: link.categoryId,
  }));
}
