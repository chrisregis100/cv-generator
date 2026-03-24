const FEEXPAY_API_URL = "https://api.feexpay.me";
const FEEXPAY_API_KEY = process.env.FEEXPAY_API_KEY!;
const FEEXPAY_SHOP_ID = process.env.FEEXPAY_SHOP_ID!;

export interface FeexPayCheckoutParams {
  amount: number;
  currency: string; // "XOF"
  description: string;
  callback_url: string;
  return_url: string;
  custom_id?: string; // userId pour retrouver l'utilisateur au callback
}

export interface FeexPayCheckoutResponse {
  payment_url: string;
  token: string;
  status: string;
}

export interface FeexPayVerifyResponse {
  status: "successful" | "failed" | "pending";
  amount: number;
  currency: string;
  custom_id?: string;
  transaction_id: string;
}

export async function createFeexPayCheckout(params: FeexPayCheckoutParams): Promise<FeexPayCheckoutResponse> {
  const response = await fetch(`${FEEXPAY_API_URL}/api/orders/online/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FEEXPAY_API_KEY}`,
    },
    body: JSON.stringify({
      ...params,
      shop: FEEXPAY_SHOP_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(`FeexPay checkout error: ${response.statusText}`);
  }

  return response.json();
}

export async function verifyFeexPayPayment(token: string): Promise<FeexPayVerifyResponse> {
  const response = await fetch(`${FEEXPAY_API_URL}/api/orders/online/${token}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${FEEXPAY_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`FeexPay verify error: ${response.statusText}`);
  }

  return response.json();
}
