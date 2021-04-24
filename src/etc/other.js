export const IsSafari = () => {
  var is_safari = navigator.userAgent.toLowerCase().indexOf("safari/") > -1;
  return is_safari;
};

export const iosCopyToClipboard = (inputId) => {
  document.querySelector(`#${inputId}`).select();
  document.execCommand("copy");
};
