import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import internationalImage from '../assets/nepalese-flag.png';

function International() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});

  useEffect(() => {
    const newProps = {
      title: 'International',
      image: internationalImage,
      titleClassName: 'internationalTitle',
      imageClassName: 'internationalImage',
    };

    if (
      prevSidebarProps.current.title !== newProps.title ||
      prevSidebarProps.current.image !== newProps.image
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
    <div className="content-wrapper">
      <h1 className="mt-4">Explore International Cuisine</h1>
      <p>In this section, you'll learn about the rich and diverse flavors from different cultures around the world.</p>
      <p>We'll dive into recipes, techniques, and unique ingredients that define the culinary traditions of various countries.</p>
    </div>
  );
}

export default International;
