import { useContext } from "react";
import context from "../../context/myContext";
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Scanner from './Scanner';

interface Result {
  codeResult: {
    code: string;
  };
}

const BarCodeScanner = () => {
  const {
    setCode,
  } = useContext(context);

  const handleDetected = (result:Result) => {
    if (result) {
      setCode(result.codeResult.code);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 items-center justify-center">
        <ViewfinderCircleIcon className="h-10 text-gray-100"/>
        <span className="text-gray-100">Scanneie o código de barras!</span>
      </div>
      <div className="flex items-center justify-center h-36 md:h-full relative overflow-hidden">
        <Scanner onDetected={handleDetected} />
      </div>
    </div>
  );
};

export default BarCodeScanner;