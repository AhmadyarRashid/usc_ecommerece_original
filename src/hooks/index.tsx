import { useState } from 'react';

type UseToggle = (initialToggle: boolean) => [boolean, () => void];

const useToggle: UseToggle = (initialToggle) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialToggle);

  const toggleModal = () => {
    setIsVisible(prev => !prev);
  };

  return [isVisible, toggleModal];
};

export default useToggle;
