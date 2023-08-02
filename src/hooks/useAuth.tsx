import { useQuery } from 'react-query';
import axiosInstance from '../utils/api/axios';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  platforms: {
    facebook: {
      isConnect: boolean;
      accessToken: string;
      secretToken: string;
    };
    instagram: {
      isConnect: boolean;
      accessToken: string;
      secretToken: string;
    };
    twitter: {
      isConnect: boolean;
      accessToken: string;
      secretToken: string;
    };
    linkedin: {
      isConnect: boolean;
      accessToken: string;
      secretToken: string;
    };
    tiktok: {
      isConnect: boolean;
      accessToken: string;
      secretToken: string;
    };
    google: {
      isConnect: boolean;
      accessToken: string;
      secretToken: string;
    };
  };
}

const fetchUserDetails = async (): Promise<IUser | null> => {
  try {
    const response = await axiosInstance.get<IUser>('/users/me');
    return response.data;
  } catch (error) {
    return null;
  }
};

const useAuth = () => {
  const { data: user, isLoading } = useQuery('user', fetchUserDetails, {
    staleTime: 600000, // 10 minutes, how long to consider the data fresh, reduce for more real-time updates
    refetchOnWindowFocus: false, // Do not refetch when the window regains focus
    retry: false, // Do not retry failed requests
  });

  return { user, isLoading };
};

export default useAuth;
