import { CLIENT_METHOD, CLIENT_SERVICES } from '@/constants';
import ServiceClient from './ServiceClient';

const payment = {
  async transferFunds<T>({
    amount,
    recipient,
  }: {
    amount: number;
    recipient: string;
  }): Promise<T | Error> {
    try {
      const body = {
        amount: JSON.stringify(amount),
        recipient,
      };
      const response = await ServiceClient.getInstance().authFetch<T>({
        method: CLIENT_METHOD.POST,
        service: CLIENT_SERVICES.PAYMENT,
        url: '/transfer',
        body,
      });
      return response;
    } catch (error) {
      throw new Error(error as string);
    }
  },
};

export default payment;
