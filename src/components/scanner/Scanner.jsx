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
          },
        },
        decoder: {
          readers: ["ean_reader"],
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
            }
          }
        },
        locate: true,
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
