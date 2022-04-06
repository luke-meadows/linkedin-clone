import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDisableScreen } from '../features/disableScreen';
import '../styles/ScrollContainer.css';

export default function ScrollContainer({ children }) {
  const isScreenDisabled = useSelector(selectDisableScreen);
  useEffect(() => {
    console.log({ isScreenDisabled });
  }, [isScreenDisabled]);
  return <div className={isScreenDisabled ? 'disabled' : ''}>{children}</div>;
}
