import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDisableScreen } from '../features/disableScreen';
import '../styles/ScrollContainer.css';

export default function ScrollContainer({ children, height }) {
  const isScreenDisabled = useSelector(selectDisableScreen);
  const [scrollTo, updateScrollTo] = useState(0);

  const containerRef = useRef();
  useEffect(() => {
    const scrollY = window.scrollY;

    console.log(scrollY);
    updateScrollTo(scrollY);
    if (isScreenDisabled) {
      containerRef.current.style = `position: fixed;
           top: -${scrollY}px;`;
    } else {
      containerRef.current.style = `position: initial`;
      window.scrollTo(0, scrollTo);
    }
  }, [isScreenDisabled]);
  function handleScroll(e) {
    console.log(e);
  }
  return (
    <div
      ref={containerRef}
      style={isScreenDisabled ? height : {}}
      className={isScreenDisabled ? 'disabled' : ''}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
}
