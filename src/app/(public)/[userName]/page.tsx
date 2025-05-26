import Page from "@/components/LandinPage";
import { notFound } from "next/navigation";

import { findCategoriesByUserName } from "@/services/category";
import { findLinksByUserName } from "@/services/link";
import { findUserProfileByUsername } from "@/services/user";
import { getValidItems } from "@/utils/getValidItems";

export default async function LandingPAge({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;

  const user = await findUserProfileByUsername(userName);

  if (!user) {
    notFound();
  }

  const categories = await findCategoriesByUserName(userName);
  const links = await findLinksByUserName(userName);

  return (
    <div className="flex min-h-screen max-w-full bg-gray-800">
      <Page.Container>
        <Page.Content>
          <Page.Profile name={user?.name} bio={user?.bio || ""} />

          {categories?.map((category) => {
            return (
              <Page.Category title={category.title} key={category.id}>
                {getValidItems({
                  list: links || [],
                  param: "categoryId",
                  value: category.id,
                }).map((link) => {
                  return (
                    <Page.Link
                      key={link.id}
                      url={link.url}
                      title={link.title}
                    />
                  );
                })}
              </Page.Category>
            );
          })}

          <div className="flex flex-col items-center w-full mt-4">
            {getValidItems({
              list: links || [],
              param: "categoryId",
              value: null,
            }).map((link) => {
              return (
                <Page.Link
                  key={link.id}
                  url={link.url}
                  title={link.title}
                  variant="outlined"
                />
              );
            })}
          </div>
        </Page.Content>
      </Page.Container>
    </div>
  );
}
