export interface CheckoutRequest {
  amount: number;
  reference: string;
  description: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
}

interface CheckoutResponse {
  message?: string;
  checkoutUrl?: string;
}

export async function startCheckout(endpoint: string, payload: CheckoutRequest): Promise<CheckoutResponse> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let data: CheckoutResponse = {};
  try {
    data = (await response.json()) as CheckoutResponse;
  } catch {
    // A safe generic error is shown below when the endpoint does not return JSON.
  }

  if (!response.ok) {
    throw new Error(data.message || 'The payment service is unavailable. Please try again or contact us.');
  }

  return data;
}
