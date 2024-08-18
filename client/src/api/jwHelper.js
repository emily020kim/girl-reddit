import jwt_decode from 'jwt-decode';

function decodeToken(token) {
  try {
    const decoded = jwt_decode(token);
    return decoded.id;
  } catch (error) {
    console.error('Error decoding the token:', error);
    return null;
  };
};

export { decodeToken };