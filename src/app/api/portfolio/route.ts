import { NextResponse } from 'next/server';
import mockedData from '@/mock/data.json';

export async function GET(request: Request) {
  try {
    // Faked delay to simulate real API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate error if error query param is present
    const url = new URL(request.url);
    if (url.searchParams.get('error')) {
      throw new Error('Simulated error');
    }

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
