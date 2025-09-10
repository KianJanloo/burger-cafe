const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type FetchApiOptions = RequestInit & { params?: Record<string, unknown>; method?: string };

function buildUrl(url: string, params?: Record<string, unknown>) {
  if (!params) return url;
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return query ? `${url}?${query}` : url;
}

async function fetchAPI(
  endpoint: string,
  options: FetchApiOptions = {}
): Promise<unknown> {
  const url = buildUrl(`${baseUrl}${endpoint}`, options.params);

  const fetchOptions: RequestInit = {
    ...options,
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export default fetchAPI;