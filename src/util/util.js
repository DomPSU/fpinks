export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const capitalize = (string) => {
  if (string === null) {
    return null;
  }

  if (string === undefined) {
    return undefined;
  }

  // capitalize all words in string
  const splitStr = string.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

export const getIDToken = () => {
  if (window.gapiLoaded === true) {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    const googleUser = googleAuth.currentUser.get();
    const idToken = googleUser.getAuthResponse().id_token;
    return idToken;
  }
  console.log('Get ID token error due to gapi not loaded');
};
