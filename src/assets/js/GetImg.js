export function _arrayBufferToBase64(buffer, type) {
    if(type!=='image/jpeg'){
        type = 'video/mp4'
    }
    const prefix = "data:" + type + ";base64, ";
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return prefix + window.btoa(binary);
}
