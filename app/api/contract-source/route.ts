import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const contractPath = join(process.cwd(), 'src', 'DelegationRegistry.sol');
    const contractContent = readFileSync(contractPath, 'utf8');
    
    return new NextResponse(contractContent, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error reading contract file:', error);
    return new NextResponse('// Failed to load contract source', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}