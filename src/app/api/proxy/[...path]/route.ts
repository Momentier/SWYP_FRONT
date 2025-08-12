import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://223.130.155.172:443/api/v1';

// Node.js 환경에서 SSL 검증 우회 설정
if (typeof process !== 'undefined' && process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

async function proxyRequest(request: NextRequest, method: string) {
  try {
    const { pathname, search } = new URL(request.url);
    const path = pathname.replace('/api/proxy', '');
    const targetUrl = `${BASE_URL}${path}${search}`;

    console.log(`Proxying ${method} request to:`, targetUrl);

    const headers: Record<string, string> = {};
    
    // 요청 헤더 복사 (특정 헤더들 제외)
    request.headers.forEach((value, key) => {
      if (!['host', 'content-length', 'connection'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    // body가 있는 경우 추가
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const body = await request.text();
        if (body) {
          fetchOptions.body = body;
        }
      } catch (error) {
        console.warn('Failed to read request body:', error);
      }
    }

    const response = await fetch(targetUrl, fetchOptions);
    
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      // CORS 관련 헤더들은 제외
      if (!['access-control-allow-origin', 'access-control-allow-credentials'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // CORS 헤더 추가
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
  return proxyRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, 'DELETE');
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request, 'PATCH');
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
