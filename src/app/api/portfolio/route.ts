import { NextResponse } from 'next/server';
import mockedData from '@/mock/data.json';

export async function GET() {
  try {
    // Faked delay to simulate real API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(mockedData, {
      status: 200,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
