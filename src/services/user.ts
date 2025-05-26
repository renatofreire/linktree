import { cache } from "react";
import { compareSync, hashSync } from "bcrypt-ts";
import { auth } from "@/auth";

import db from "@/lib/db";
import { AuthUserInfo, Credentials, PublicUserInfo, User } from "@/types";

export async function getCurrentSession() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("No active session found");
  }

  return session as typeof session & { userId: string };
}

export async function getLoggedUser(): Promise<PublicUserInfo | null> {
  const { userId } = await getCurrentSession();
  return findUserById(userId);
}

export const findUserByEmail = cache(
  async (email: string): Promise<PublicUserInfo | null> => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return returnPublicUserInfo(user);
  }
);

export const findUserById = cache(
  async (id: string): Promise<PublicUserInfo | null> => {
    await getCurrentSession();

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return returnPublicUserInfo(user);
  }
);

export async function findUserByCredentials({
  email,
  password,
}: Credentials): Promise<(PublicUserInfo & { id: string }) | null> {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  const isValidUser = !!user && compareSync(password, user.password);
  return isValidUser
    ? {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
      }
    : null;
}

export async function createUser(user: AuthUserInfo): Promise<User> {
  return await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      userName: user.userName,
      password: hashSync(user.password),
    },
  });
}

export async function updateUser(
  updates: Partial<Omit<User, "id">>
): Promise<PublicUserInfo | null> {
  const { userId } = await getCurrentSession();

  if (updates.password) {
    updates.password = hashSync(updates.password);
  }

  const user = await db.user.update({
    where: { id: userId },
    data: updates,
  });

  return returnPublicUserInfo(user);
}

export async function findUserProfileByUsername(
  userName: string
): Promise<PublicUserInfo | null> {
  const user = await db.user.findUnique({
    where: {
      userName,
    },
  });

  if (!user) {
    return null;
  }

  return {
    name: user.name,
    userName: user.userName,
    bio: user.bio,
    email: user.email,
  };
}

function returnPublicUserInfo(user: User | null): PublicUserInfo | null {
  return user
    ? {
        name: user.name,
        email: user.email,
        userName: user.userName,
        bio: user.bio,
      }
    : null;
}
