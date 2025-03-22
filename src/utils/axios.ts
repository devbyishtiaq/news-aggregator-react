import axios from "axios";

/**
 * axiosInstance is a pre-configured Axios instance.
 *
 * It sets a default timeout of 10000 milliseconds and specifies that all requests
 * should use JSON as the content type.
 *
 * @returns An AxiosInstance object.
 */
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

/**
 * Usage example:
 *
 * import axiosInstance from './axios';
 *
 * async function fetchData() {
 * try {
 * const response = await axiosInstance.get('/api/data');
 * console.log(response.data);
 * } catch (error) {
 * console.error('Error fetching data:', error);
 * }
 * }
 */
