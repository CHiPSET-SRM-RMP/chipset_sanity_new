import { NextRequest, NextResponse } from 'next/server';

// Backend API URL - Azure deployed backend
const BACKEND_URL = 'https://recruitment-fvbnapazb8d8bqgf.southindia-01.azurewebsites.net';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Forward the request to your backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/recruitment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const responseData = await backendResponse.json();

    // Return the backend response with the same status code
    return NextResponse.json(responseData, { 
      status: backendResponse.status 
    });

  } catch (error) {
    console.error('Frontend API Error:', error);
    
    return NextResponse.json({
      error: 'Failed to process recruitment application',
      message: 'Please try again later'
    }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}