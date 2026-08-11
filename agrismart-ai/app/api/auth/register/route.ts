import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/lib/utils';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, signJWT } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const conn = await dbConnect();
    
    // In Mock mode if database not connected
    if (!conn) {
      const mockUser = {
        _id: 'mock-user-id-' + Math.random().toString(36).substring(7),
        email,
        firstName,
        lastName,
        role: role || 'Farmer',
      };
      const token = await signJWT(mockUser);
      const response = NextResponse.json({ success: true, user: mockUser, token });
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400,
        path: '/'
      });
      return response;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
      role: role || 'Farmer'
    });

    const userPayload = {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };

    const token = await signJWT(userPayload);
    
    // Set HTTPOnly cookie for session persistence (optional, can also be stored in localStorage)
    const response = NextResponse.json({ success: true, user: userPayload, token });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400, // 1 day
      path: '/'
    });

    return response;
  } catch (error: unknown) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
