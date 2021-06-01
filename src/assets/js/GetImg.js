import axios from "axios";

export function getBase64() {
    axios
        .get(process.env.VUE_APP_BACKEND_URL + 'getImg/' + this.userId, {
            responseType: 'arraybuffer'
        })
        .then(response => {
            _arrayBufferToBase64(response.data)
        })
}
export function _arrayBufferToBase64(buffer) {
    const prefix = "data:image/png;base64, ";
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return prefix + window.btoa(binary);
}
