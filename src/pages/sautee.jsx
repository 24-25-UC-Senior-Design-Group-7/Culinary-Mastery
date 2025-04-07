import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import SauteeImage from '../assets/saute-icon.png';

function Sautee() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});

  useEffect(() => {
    const newProps = {
      title: 'Sautee',
      image: SauteeImage,
      titleClassName: 'sauteeTitle',
      imageClassName: 'sauteeImage',
    };

    if (
      prevSidebarProps.current.title !== newProps.title ||
      prevSidebarProps.current.image !== newProps.image
    ) {
      updateSidebarProps(newProps);
      prevSidebarProps.current = newProps;
    }

    return () => {
      // Clear props on unmount
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
      <h1 className="mt-4">Sautee Techniques</h1>
      <p>Learn the art of sauteeing in this section. It’s a quick-cook technique using a small amount of fat.</p>
    </>
  );
}

export default Sautee;
