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

export const execAfterGapiLoaded = (func) => {
  // call renderSignIn right after gapi is loaded
  document.getElementById('gapiScript').addEventListener('load', func);

  // call renderSignIn if gapi is already loaded to avoid race condition
  if (window.gapiLoaded === true) {
    func();
  }
};

export const signOut = () => {
  window.gapi.load('auth2', () => {
    window.gapi.auth2
      .init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      })
      .then(() => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          console.log('User signed out.');
        });
      });
  });
};

// TODO
export const isLoggedIn = () => {
  window.gapi.load('auth2', () => {
    window.gapi.auth2
      .init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      })
      .then(() => {
        const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
        console.log(isSignedIn);
        return isSignedIn;
      });
  });
};

// TODO
export const isAdmin = () => {
  return null;
};

export default { isDevelopment, capitalize, execAfterGapiLoaded, isLoggedIn };
