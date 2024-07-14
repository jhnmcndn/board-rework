import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const ip = async () => {
  const response: AxiosResponse<{ ip: string }> = await axios.get('https://api.ipify.org?format=json');
  return response.data;
};
