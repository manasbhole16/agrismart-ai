import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user: Record<string, unknown> = { ...payload };
  delete user.exp;
  return NextResponse.json({ user });
}
