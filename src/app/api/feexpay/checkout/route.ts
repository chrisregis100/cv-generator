import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createFeexPayCheckout } from "@/lib/feexpay";
import { headers } from "next/headers";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const checkout = await createFeexPayCheckout({
      amount: 9900, // 9900 XOF ≈ 15€
      currency: "XOF",
      description: "CV Generator Premium - Accès à vie",
      callback_url: `${appUrl}/api/feexpay/verify`,
      return_url: `${appUrl}/dashboard?upgraded=true`,
      custom_id: session.user.id,
    });

    return NextResponse.json({ payment_url: checkout.payment_url, token: checkout.token });
  } catch (error) {
    console.error("FeexPay checkout error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}
