export const IsSafari = () => navigator.userAgent.toLowerCase().indexOf('safari/') > -1;

export const iosCopyToClipboard = (inputId) => {
  document.querySelector(`#${inputId}`).select();
  document.execCommand('copy');
};
