
export const openStream = () => {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}
