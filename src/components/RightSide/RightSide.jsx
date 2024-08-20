import { useState } from 'react';
import SelectBar from './SelectBar/SelectBar';
import ShowBox from './ShowBox/ShowBox';

const RightSide = () => {
  const [showRightContainer, setShowRightContainer] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);

  const handleSearch = () => {
    setShowRightContainer(true);
    setCurrentImage(Math.floor(Math.random() * 5) + 1);
  };

  return (
    <div className='rightSide'>
      <ShowBox showRightContainer={showRightContainer} currentImage={currentImage} />
      <SelectBar handleSearch={handleSearch} className="SelectBar"/>
    </div>
  );
};

export default RightSide;