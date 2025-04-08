import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [sidebarProps, setSidebarProps] = useState({
    title: 'Course',
    image: '',
    titleClassName: '',
    imageClassName: '',
  });

  useEffect(() => {
    const savedToggleState = localStorage.getItem('sb|sidebar-toggle');
    if (savedToggleState === 'true') {
      setIsToggled(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sb|sidebar-toggle', isToggled);
  }, [isToggled]);

  const toggleSidebar = useCallback(() => {
    setIsToggled((prevState) => !prevState);
  }, []);

  const updateSidebarProps = useCallback((newProps) => {
    setSidebarProps((prevProps) => {
      const updatedProps = { ...prevProps, ...newProps };
      if (
        updatedProps.title !== prevProps.title ||
        updatedProps.image !== prevProps.image ||
        updatedProps.titleClassName !== prevProps.titleClassName ||
        updatedProps.imageClassName !== prevProps.imageClassName
      ) {
        return updatedProps;
      }
      return prevProps;
    });
  }, []);

  const resetSidebarProps = useCallback(() => {
    setSidebarProps((prevProps) => ({
      ...prevProps,
      title: '',
      image: '', 
      titleClassName: '',
      imageClassName: '', 
    }));
  }, []);

  return (
    <SidebarContext.Provider value={{ isToggled, toggleSidebar, sidebarProps, updateSidebarProps, resetSidebarProps }}>
      {children}
    </SidebarContext.Provider>
  );
};
