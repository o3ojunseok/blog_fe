import { useState, useEffect } from 'react';
import api from 'api/api';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from 'hooks/store/store';
import { UserProfile } from './interface';

export const useUserDetailInfo = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [userInfo, setUserInfo] = useState<UserProfile>();
  useEffect(() => {
    const getUserDetailInfo = async () => {
      try {
        const response = await api.get(`/user/list/${user.id}`);

        if (response.status === 200) {
          const data = response.data;
          setUserInfo(data);
          return data;
        }
      } catch (error) {
        alert('유저정보 없음');
      }
    };

    getUserDetailInfo();
  }, [user.id]);

  return { userInfo, useUserDetailInfo };
}

export default useUserDetailInfo;