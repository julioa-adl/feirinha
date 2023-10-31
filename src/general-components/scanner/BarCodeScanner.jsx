import React, { useState } from 'react';
import Scanner from './Scanner';

const BarCodeScanner = () => {
  const [code, setCode] = useState('');

  const handleDetected = result => {
    setCode(result.codeResult.code);
    console.log(result.codeResult.code)
  };

  return (
    <div>
      <h1>Scanner de código de barras</h1>
      <p>Escaneie um código de barras para ver o resultado:</p>
      <Scanner onDetected={handleDetected} />
      {code && <p>O código de barras escaneado é: {code}</p>}
    </div>
  );
};

export default BarCodeScanner;
