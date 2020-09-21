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

// TODO send http cookie to backend
export const isLoggedIn = () => {
  return null;
};

// TODO send http cookie to backend
export const isAdmin = () => {
  return null;
};

export default { isDevelopment, capitalize, isLoggedIn };
