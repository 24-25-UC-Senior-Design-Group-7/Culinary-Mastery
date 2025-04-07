import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import CookingImage from '../assets/cooking-icon.png';

function Cooking() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});

  useEffect(() => {
    const newProps = {
      title: 'Cooking',
      image: CookingImage,
      titleClassName: 'cookingTitle',
      imageClassName: 'cookingImage',
    };

    if (
      prevSidebarProps.current.title !== newProps.title ||
      prevSidebarProps.current.image !== newProps.image ||
      prevSidebarProps.current.titleClassName !== newProps.titleClassName ||
      prevSidebarProps.current.imageClassName !== newProps.imageClassName
    ) {
      updateSidebarProps(newProps);
      prevSidebarProps.current = newProps;
    }

    return () => {
      updateSidebarProps({
        title: '',
        image: '',
        titleClassName: '',
        imageClassName: '',
      });
    };
  }, [updateSidebarProps]);

  return (
    <>
      <h1 className="mt-4">Cooking</h1>
      <p>Welcome to the Cooking section. Here you will learn the art of cooking.</p>
      <p>Explore various cooking techniques and recipes that will help you master the culinary world.</p>
    </>
  );
}

export default Cooking;
