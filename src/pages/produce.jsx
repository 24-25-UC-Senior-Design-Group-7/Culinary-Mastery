import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import ProduceImage from '../assets/produce.png';

function Produce() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});

  useEffect(() => {
    const newProps = {
      title: 'Produce',
      image: ProduceImage,
      titleClassName: 'produceTitle',
      imageClassName: 'produceImage',
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
    <div>
      <h1>Explore the World of Produce</h1>
      <p>In this section, we'll explore various fruits, vegetables, and other plant-based ingredients used in culinary creations.</p>
    </div>
  );
}

export default Produce;
