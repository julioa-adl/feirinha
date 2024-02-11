// @ts-ignore
import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected, zoom }) => {
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
        Quagga.start()
        
      }
    );

    const myZoom = () => {
      const track = Quagga.CameraAccess.getActiveTrack();
      var capabilities = track.getCapabilities();
      try {
        track.applyConstraints({ advanced: [{zoom: capabilities.zoom[zoom]}]})
      } catch(error) {
        console.log('zoom não funciona neste dispositivo')
      }
    }
    setTimeout(myZoom, 1000);

    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, [zoom]);

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
