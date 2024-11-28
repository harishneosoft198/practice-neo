document.addEventListener('DOMContentLoaded', function () {
    const qrCodeScanner = new ZXing.BrowserQRCodeReader();
    const videoElement = document.getElementById('qr-video');
    const resultElement = document.getElementById('result');
    const startScanButton = document.getElementById('start-scan');
  
    let scanning = false;
  
    startScanButton.addEventListener('click', () => {
      if (!scanning) {
        qrCodeScanner
          .getVideoInputDevices()
          .then((videoInputDevices) => {
            if (videoInputDevices.length > 0) {
              const chosenDeviceId = videoInputDevices[0].deviceId;
              qrCodeScanner
                .decodeFromInputVideoDevice(chosenDeviceId, 'qr-video', (result, err) => {
                  if (result) {
                    resultElement.innerText = result.text;
                  }
                  if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error(err);
                  }
                })
                .then(() => {
                  scanning = true;
                  startScanButton.textContent = 'Stop Scan';
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              console.error('No video input devices found');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        qrCodeScanner.stopDecode();
        scanning = false;
        startScanButton.textContent = 'Start Scan';
        resultElement.innerText = '';
      }
    });
  });
  