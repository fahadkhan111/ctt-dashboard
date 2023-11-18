// import { Link, useLocation } from 'react-router-dom'
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { DASHBOARD_SIDEBAR_LINKS } from "../../../lib/constants";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/themeContext";

import { motion } from "framer-motion";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 rounded-sm text-base";
//

export default function Sidebar() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  // const [showLogoout, setShowLogout] = useState(false);

  const { enabled } = useContext(ThemeContext);

  const handleMouseEnter = (iconKey) => {
    setHoveredIcon(iconKey);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);

  const handleLogoutMouseEnter = () => {
    setShowLogoutTooltip(true);
  };

  const handleLogoutMouseLeave = () => {
    setShowLogoutTooltip(false);
  };

  return (
    <div
      className={`${
        enabled ? "bg-gray-600" : "bg-greyDark"
      }  lg:px-1 py-5 flex flex-col rounded-2xl justify-between`}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <div className="flex items-center justify-center ">
          <FcBullish fontSize={34} />
          {/* <span className="text-neutral-200 text-lg">OpenShop</span> */}
        </div>
        <div className="flex flex-col justify-between h-full items-center">
          <div className="py-8 flex flex-col  gap-2 h-full">
            {DASHBOARD_SIDEBAR_LINKS.map((link) => (
              <SidebarLink
                key={link.key}
                link={link}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                isHovered={hoveredIcon === link.key}
              />
            ))}
          </div>
          <div
            className="relative cursor-pointer"
            onMouseEnter={handleLogoutMouseEnter}
            onMouseLeave={handleLogoutMouseLeave}
          >
            <span>
              <HiOutlineLogout
                className={`${
                  showLogoutTooltip
                    ? " bg-gray-300 text-5xl p-1 shadow-lg  "
                    : "text-3xl "
                } max-w-full h-full w-full transition-all duration-300 text-red`}
              />
            </span>
            {showLogoutTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-300 px-3 py-2  rounded-r-lg shadow-xl absolute top-0 left-14 font-semibold"
              >
                Logout
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="relative "> */}
    </div>
  );
}

function SidebarLink({ link, handleMouseEnter, handleMouseLeave, isHovered }) {
  const { pathname } = useLocation();
  const { enabled } = useContext(ThemeContext);

  return (
    <Link
      to={link.path}
      className={` ${linkClass} relative w-14 h-full flex flex-col `}
      onMouseEnter={() => handleMouseEnter(link.key)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${
          pathname === link.path
            ? " text-gray-500 text-5xl"
            : "text-gray-700 text-3xl"
        } ${enabled ? "text-white" : "text-gray-600"} ${
          isHovered
            ? " bg-gray-300 text-5xl p-1 shadow-lg transition-all duration-300 "
            : "text-3xl transition-all duration-300"
        }`}
      >
        {link.icon}
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${
            enabled ? "bg-gray-600" : "bg-gray-300"
          } px-3 py-2 rounded-r-lg shadow-xl absolute top-2 z-10 left-16 font-semibold`}
        >
          <div className="flex flex-col gap-2 justify-center w-40">
            <span className="flex justify-center">{link.label}</span>
            {link.subItems && (
              <div>
                {link.subItems.map((subItem) => (
                  <motion.div
                    key={subItem.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: subItem.index * 2 }}
                    to={subItem.path}
                    className={` ${linkClass} ${
                      pathname === subItem.path
                        ? " text-gray-500"
                        : "text-gray-700"
                    }, relative w-full h-full flex justify-center text-md ${
                      enabled
                        ? "text-gray-300 hover:bg-gray-500 "
                        : "bg-gray-300 hover:bg-gray-200 text-black"
                    }`}
                  >
                    <span className="rounded-r-lg   left-14 font-semibold">
                      {subItem.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </Link>
  );
}

SidebarLink.propTypes = {
  link: PropTypes.shape({
    key: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    subItems: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
};
