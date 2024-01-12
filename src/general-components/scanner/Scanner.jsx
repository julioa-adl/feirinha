// @ts-ignore
import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected }) => {
  useEffect(() => {
    const configureCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const track = stream.getVideoTracks()[0];

        // Verifique se a funcionalidade de controle de zoom está disponível
        if ('getCapabilities' in track.getSettings()) {
          const capabilities = track.getCapabilities();

          // Verifique se 'zoom' é uma propriedade suportada
          if ('zoom' in capabilities) {
            // Ajuste o zoom da câmera para o valor desejado (por exemplo, 2)
            await track.applyConstraints({ advanced: [{ zoom: capabilities.zoom.max }] });
          }
        }
      } catch (error) {
        console.error('Error configuring camera:', error);
      }
    };

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
        configureCamera(); // Chame a função de configuração da câmera aqui
        setTimeout(() => {
          Quagga.start(); // Inicie o Quagga após um pequeno atraso
        }, 500);
      }
    );

    const myZoom = async () => {
      const track = await Quagga.CameraAccess.getActiveTrack();
      var capabilities = await track.getCapabilities();
      await track.applyConstraints({ advanced: [{zoom: capabilities.zoom.max}]}).catch(e => console.log(e));
    }
    myZoom()

    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, []);

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
