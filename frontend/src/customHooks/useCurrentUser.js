import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function useCurrentUser() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        dispatch(setUserData(null));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return { user, loading };
}

export default useCurrentUser;
