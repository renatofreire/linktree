import AddContentForms from "../AddContentForms";
import { CategoriesAndLinksList } from "../CategoriesAndLinksList";
import ProfileForm from "../ProfileForm";

export default function Panel() {
  return (
    <div className="flex flex-col  w-full p-4">
      <ProfileForm />

      <AddContentForms />

      <CategoriesAndLinksList />
    </div>
  );
}
