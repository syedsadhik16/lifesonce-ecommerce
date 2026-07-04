export const runtime = "nodejs";

type RazorpayOrderRequest = {
  amount?: number;
  currency?: string;
  receipt?: string;
};

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return Response.json(
      {
        error:
          "Missing Razorpay environment variables. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to create server-side orders.",
      },
      { status: 500 }
    );
  }

  let body: RazorpayOrderRequest;
  try {
    body = (await request.json()) as RazorpayOrderRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return Response.json({ error: "A valid amount in paise is required." }, { status: 400 });
  }

  // This route is preparation for production checkout.
  // Verify Razorpay payment signatures on the server before marking any order as paid.
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount),
      currency: body.currency || "INR",
      receipt: body.receipt || `lifesonce_${Date.now()}`,
    }),
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
