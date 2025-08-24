import React, { useState } from "react";
// import { routes } from "../../config/utilities/utils.constant";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileAppsHeader";

const navItems = [
  { label: "Home", link:'/'},
  { label: "About Us", link:'/' },
  { label: "Contact Us", link: '/' },
];

function Header({ gradient = false,glassEffect=false }) { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);  
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    if (isProcessing) return; // Prevents further clicks while processing
  
    setIsProcessing(true);  
    setShouldRender(true);
    setIsMenuOpen(true);
  
    setTimeout(() => {
      setIsProcessing(false);
    }, 200); 
  };
  
  const toggleMenuClose = () => {
    if (isProcessing) return; 
  
    setIsProcessing(true);  
    setIsMenuOpen(false);
    setIsSubMenuOpen(false);
  
    setTimeout(() => {
      setOpenSubmenuIndex(null);
      setShouldRender(false);
      setIsProcessing(false);  
    }, 200); 
  };
  
 

 


  return (
    <>
  
      {/* Header for desktop */}
    <DesktopHeader glassEffect={glassEffect}  gradient = {gradient} navItems={navItems}  toggleMenuOpen={toggleMenuOpen }/>

      {/* Header for mobile apps */}
     <MobileHeader   navItems={navItems} toggleMenuClose={toggleMenuClose} shouldRender ={shouldRender} setShouldRender={setShouldRender} isMenuOpen={isMenuOpen} setIsMenuOpen ={setIsMenuOpen} isSubMenuOpen ={isSubMenuOpen} setIsSubMenuOpen={setIsSubMenuOpen} openSubmenuIndex={openSubmenuIndex}setOpenSubmenuIndex={setOpenSubmenuIndex}
     />
    </>
  );
}

export default Header;
