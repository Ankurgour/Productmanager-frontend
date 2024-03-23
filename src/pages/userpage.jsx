import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../features/user/userSlice';

function UserDetails({ userId }) {
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, [dispatch, userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{userInfo.name}</h1>
    </div>
  );
}

export default UserDetails;
