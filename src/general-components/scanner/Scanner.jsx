// @ts-ignore
import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type : "LiveStream",
          size: 1080,
          constraints: {
              width: 1080,
              height: 1920,
              facingMode: "environment" // or user
          },
          area: { // defines rectangle of the detection/localization area
            top: "0%",    // top offset
            right: "0%",  // right offset
            left: "0%",   // left offset
            bottom: "0%"  // bottom offset
          },
        },
        numOfWorkers: 4,
        decoder: {
          readers : ["ean_reader"]
        },
        locate: true
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
  }, []);

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
