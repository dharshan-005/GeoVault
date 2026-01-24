import { motion } from "framer-motion";

import "./SideDrawer.css";

const SideDrawer = ({ children }) => {
  return (
    <motion.aside
      className="side-drawer"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.aside>
  );
};

export default SideDrawer;
