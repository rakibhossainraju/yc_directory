import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET() {
  const healthData: any = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      sanity: 'unknown',
    },
  };

  try {
    // Basic check to see if Sanity is reachable
    await client.fetch('*[_type == "author"][0...1]');
    healthData.services.sanity = 'healthy';
    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    healthData.status = 'error';
    healthData.services.sanity = 'unhealthy';
    return NextResponse.json(healthData, { status: 503 });
  }
}
