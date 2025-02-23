/**
 * This is the main root routes params types, it includes all different stacks
 */
export type TypedRouteParams = PaymentRouteParams;

interface PaymentRouteParams {
  PAYMENTS_FAILED: { error: Error };
  PAYMENT_CONFIRMATION: { item: string[] };
  RECEIPT_DETAIL: { item: string[] };
}
