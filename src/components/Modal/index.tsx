import { motion } from "framer-motion";

export default function Modal({
  children,
  onBackdropClick,
}: {
  children: React.ReactNode;
  onBackdropClick?: VoidFunction;
}) {
  return (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 opacity-40 z-10"
        onClick={onBackdropClick}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-4xl shadow-lg p-6 z-20 w-[90%] md:w-1/2"
      >
        {children}
      </motion.div>
    </>
  );
}
