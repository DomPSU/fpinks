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
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  } else {
    console.log('Sign out error due to gapi not loaded');
  }
};

// TODO
export const isAdmin = () => {
  if (isDevelopment()) {
    return developmentSignIn();
  }

  // TODO
  return true;
};
