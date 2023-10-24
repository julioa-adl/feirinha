import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 320,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader"],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          }
        }
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(onDetected);
    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
