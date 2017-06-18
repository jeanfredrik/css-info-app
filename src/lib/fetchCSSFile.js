import axios from 'axios';

export default async function fetchCSSFile(url) {
  const result = await axios.get(`${process.env.REACT_APP_CORS_PROXY}/${url}`);
  return result.data;
}
