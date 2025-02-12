 export const fetchFromAPI = async (
    verb: 'POST' | 'GET' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: unknown,
    token?: string
  ) => {
    try {
      const url = `${process.env.BACK_API}/api${endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
  
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const response = await fetch(url, {
        method: verb,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined, 
      });
  
      if (!response.ok) throw new Error('Error fetching data');
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; 
    }
  };