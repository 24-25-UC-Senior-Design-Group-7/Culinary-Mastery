import React, { createContext, useState, useContext, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const savedToggleState = localStorage.getItem('sb|sidebar-toggle');
        if (savedToggleState === 'true') {
            setIsToggled(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sb|sidebar-toggle', isToggled);
    }, [isToggled]);

    const toggleSidebar = () => {
        setIsToggled((prevState) => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ isToggled, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};