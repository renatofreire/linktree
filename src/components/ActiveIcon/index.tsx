import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ActiveIcon({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <FiEye className="text-green-500" title="Category active" />
  ) : (
    <FiEyeOff className="text-red-500" title="Category inactive" />
  );
}
