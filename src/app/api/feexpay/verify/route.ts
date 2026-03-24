import { NextRequest, NextResponse } from "next/server";
import { verifyFeexPayPayment } from "@/lib/feexpay";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!token) {
    return NextResponse.redirect(`${appUrl}/dashboard?error=missing_token`);
  }

  try {
    const payment = await verifyFeexPayPayment(token);

    if (payment.status === "successful" && payment.custom_id) {
      await db.execute(
        sql`UPDATE "user" SET plan = 'premium', "feexpayPaymentId" = ${payment.transaction_id} WHERE id = ${payment.custom_id}`
      );

      return NextResponse.redirect(`${appUrl}/dashboard?upgraded=true`);
    }

    return NextResponse.redirect(`${appUrl}/dashboard?error=payment_failed`);
  } catch (error) {
    console.error("FeexPay verify error:", error);
    return NextResponse.redirect(`${appUrl}/dashboard?error=verification_failed`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token: _token, status, custom_id, transaction_id } = body;

    if (status === "successful" && custom_id) {
      await db.execute(
        sql`UPDATE "user" SET plan = 'premium', "feexpayPaymentId" = ${transaction_id} WHERE id = ${custom_id}`
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("FeexPay callback error:", error);
    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}
