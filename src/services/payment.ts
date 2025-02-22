import { CLIENT_METHOD, CLIENT_SERVICES } from '@/constants';
import ServiceClient from './ServiceClient';

const payment = {
  async transferFunds(amount: number, recipient: string) {
    const response = await ServiceClient.getInstance().authFetch({
      method: CLIENT_METHOD.POST,
      service: CLIENT_SERVICES.PAYMENT,
      url: '/transfer',
      body: {
        amount,
        recipient,
      },
    });
    return response;
  },
};

export default payment;
