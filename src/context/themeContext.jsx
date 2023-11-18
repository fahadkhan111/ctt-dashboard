import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children } ) => {
    // const [enabled, setEnabled] = useState(false);

    const [enabled, setEnabled] = useState(
      localStorage.getItem("theme") === "dark" ? true : false
    );
  
    // Update localStorage when the theme mode changes
    useEffect(() => {
      localStorage.setItem("theme", enabled ? "dark" : "light");
    }, [enabled]);

  return (
    <ThemeContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ThemeContextProvider;
