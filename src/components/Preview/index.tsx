"use client";
import { useUser } from "@/context/userContext";
import Page from "../LandinPage";
import { getValidItems } from "@/utils/getValidItems";

export default function Preview() {
  const { user, categories, links } = useUser();
  const visibleCategories = getValidItems({
    list: categories || [],
    param: "active",
    value: true,
  });

  const visibleLinks = getValidItems({
    list: links || [],
    param: "active",
    value: true,
  });

  return (
    <div className="flex flex-col max-w-full p-4 border-l border-gray-300">
      <p className="text-xl text-center mb-4">Preview</p>
      <div className="border-2 border-black rounded-xl w-[80%] h-[700px] mx-auto overflow-y-scroll">
        <Page.Container>
          <div className="p-4">
            <Page.Content>
              <Page.Profile name={user?.name} bio={user?.bio || ""} />

              {visibleCategories?.map((category) => {
                return (
                  <Page.Category title={category.title} key={category.id}>
                    {getValidItems({
                      list: visibleLinks || [],
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
                  list: visibleLinks || [],
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
          </div>
        </Page.Container>
      </div>
    </div>
  );
}
