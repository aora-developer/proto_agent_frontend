const config = {
    apiUrl: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001'
      : 'https://your-production-api.com',
  };
  
  export default config;