import { useEffect } from 'react';
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
        photoSettings: { fillLightMode: "torch", /* or "flash" */ focusMode: "continuous" },
        frequency: 5,
        showCanvas: false,
        multiple: false,
        decoder: {
          readers: ["ean_reader"],
        },
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
