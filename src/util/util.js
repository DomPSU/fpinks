export const developmentSignIn = () => {
  return true; // toggle true/false for development
};

export const developmentAdmin = () => {
  return true; // toggle true/false for development
};

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

export const signOut = () => {
  if (isDevelopment()) {
    console.log('Signed out in development');
    return;
  }

  if (window.gapiLoaded === true) {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(() => {
      console.log('User signed out.');
    });
  } else {
    console.log('Sign out error due to gapi not loaded');
  }
};

export const getIDToken = () => {
  if (isDevelopment()) {
    console.log('Get ID token in development');
    return;
  }

  if (window.gapiLoaded === true) {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    const googleUser = googleAuth.currentUser.get();
    const idToken = googleUser.getAuthResponse().id_token;
    return idToken;
  }
  console.log('Get ID token error due to gapi not loaded');
};
