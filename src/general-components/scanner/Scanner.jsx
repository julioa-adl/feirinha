// @ts-ignore
import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          size: 1080,
          constraints: {
            width: 1080,
            height: 1920,
            facingMode: 'environment',
          },
          area: {
            top: '0%',
            right: '0%',
            left: '0%',
            bottom: '0%',
          },
        },
        numOfWorkers: 4,
        patchSize: "small",
        decoder: {
          readers: ['ean_reader'],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        setTimeout(
          Quagga.start(),
          500
        )
        
      }
    );

    const myZoom = () => {
      const track = Quagga.CameraAccess.getActiveTrack();
      var capabilities = track.getCapabilities();
      track.applyConstraints({ advanced: [{zoom: capabilities.zoom.max}]}).catch(e => console.log(e));
    }
    setTimeout(myZoom, 1000);

    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, []);

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
