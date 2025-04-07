import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import SearImage from '../assets/sear-icon.png';

function Sear() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});

  useEffect(() => {
    const newProps = {
      title: 'Sear',
      image: SearImage,
      titleClassName: 'searTitle',
      imageClassName: 'searImage',
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
    <div className="content-wrapper">
      <h1 className="mt-4">Sear Techniques</h1>
      <p>Learn how to sear meat and other ingredients to perfection in this section. Searing enhances flavors and adds texture.</p>
      <p>Explore different methods for searing, from pan-searing to grilling, and master this important cooking technique.</p>
    </div>
  );
}

export default Sear;
