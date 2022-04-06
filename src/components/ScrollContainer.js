import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDisableScreen } from '../features/disableScreen';
import '../styles/ScrollContainer.css';

export default function ScrollContainer({ children, height }) {
  const isScreenDisabled = useSelector(selectDisableScreen);
  useEffect(() => {
    console.log({ isScreenDisabled });
  }, [isScreenDisabled]);
  return (
    <div
      style={isScreenDisabled ? height : {}}
      className={isScreenDisabled ? 'disabled' : 'blue'}
    >
      {children}
    </div>
  );
}
