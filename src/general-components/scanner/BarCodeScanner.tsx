import { ViewfinderCircleIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline';
import Scanner from './Scanner';
import { useState } from 'react';

interface Result {
  codeResult: {
    code: string;
  };
}

const BarCodeScanner = ({mySetCode, title}) => {
  const [zoom, setZoom] = useState('min')
  const handleDetected = (result:Result) => {
    if (result) {
      mySetCode(result.codeResult.code);
    }
  };

  return (
    <div className="flex flex-col gap-5">
        
        {
          title && (
          <div className="flex gap-5 items-center justify-center">
            <ViewfinderCircleIcon className="h-10 text-gray-100"/>
            <span className="text-gray-100">Scanneie o código de barras!</span>
          </div>
          )
        }
      <div className="flex transition-all rounded-2xl ease-in animate-[fadeIn_3s] items-center justify-center h-36 md:h-full relative overflow-hidden">
        <Scanner onDetected={handleDetected} zoom={zoom} className="scale-150"/>
        { zoom === 'min' ? (
          <MagnifyingGlassPlusIcon
            className="h-7 text-gray-100 absolute top-2 right-2 bg-gray-700 rounded-full p-1 hover:cursor-pointer"
            onClick={() => { setZoom('max'); }}
          />
        ) : (
          <MagnifyingGlassMinusIcon
            className="h-7 text-gray-100 absolute top-2 right-2 bg-gray-700 rounded-full p-1 hover:cursor-pointer"
            onClick={() => { setZoom('min'); }}
          />
        )
        }
      </div>
    </div>
  );
};

export default BarCodeScanner;
