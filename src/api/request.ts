import { AGENT as a8801, DOMAIN as d8801 } from '@/servers/8801';
import { AGENT as a8802, DOMAIN as d8802 } from '@/servers/8802';
import { AGENT as a8803, DOMAIN as d8803 } from '@/servers/8803';
import axios from 'axios';

const server = import.meta.env.VITE_APP_SERVER;
const baseURL = server === '8801' ? d8801 : server === '8802' ? d8802 : d8803;
const agent = server === '8801' ? a8801 : server === '8802' ? a8802 : a8803;
const token = localStorage.getItem('token') || '';

export const request = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    dev: 2,
    agent,
    token,
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
