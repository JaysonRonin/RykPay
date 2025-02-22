/**
 * This is the main root routes params types, it includes all different stacks
 */
export type TypedRouteParams = AuthRouteParams & PaymentRouteParams;

interface AuthRouteParams {
  LOGIN_INPUT_PASSWORD: { username: string };
  LOGIN_VERIFY_OTP_EMAIL: {
    password: string;
    flowId: string;
  };
}

interface PaymentRouteParams {
  PAYMENT_CONFIRMATION: { item: string[] };
  RECEIPT_DETAIL: { item: string[] };
}
