
const cameraOptions = document.querySelector('.video-options>select');
const video = document.querySelector('video');
let streamStarted = false;

const constraints = {
  video: {
    width: {
      min: 280,
      ideal: 280,
      max: 320,
    },
    height: {
      min: 230,
      ideal: 230,
      max: 280
    },
  }
};

const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const options = videoDevices.map(videoDevice => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = options.join('');
};

cameraOptions.onchange = () => {
    const updatedConstraints = {
        ...constraints,
        deviceId: {
        exact: cameraOptions.value
        }
    };
    startStream(updatedConstraints);
};

const startStream = async (constraints) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
    } catch (error) {
        console.log(error);
    }
  
};

const handleStream = (stream) => {
  video.srcObject = stream;
  streamStarted = true;
  video.play();
};

getCameraSelection();