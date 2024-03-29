import api from 'api/api';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useLocation } from 'react-router';

export const useRefreshToken = () => {
  const [newAccessToken, setNewAccessToken] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (location.pathname !== '/' && location.pathname !== '/signup') {
      await api.get('/auth/refresh')
        .then(response => {
          if (response.status === 200) {
            setNewAccessToken(response.data.access_token);
          }
        })
        .catch(err => {
          message.error('리프레시도 없음');
        })
      };
    }
      const intervalId = setInterval(refreshAccessToken, 5400000);
    return () => clearInterval(intervalId);
  }, []);

  return { newAccessToken };
}

export default useRefreshToken;
