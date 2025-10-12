import { NextRequest, NextResponse } from 'next/server';

// Backend API URL - Azure deployed backend
const BACKEND_URL = 'https://recruitment-fvbnapazb8d8bqgf.southindia-01.azurewebsites.net';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing backend connection...');
    
    // Forward the request to your backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/test/db`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const responseData = await backendResponse.json();

    // Return the backend response with the same status code
    return NextResponse.json(responseData, { 
      status: backendResponse.status 
    });
    
  } catch (error) {
    console.error('Frontend API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to backend',
      message: 'Please try again later',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}