import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.currentEmail) {
      navigate('/login');
    }
  }, [user])

  return (
    <div>
      <h1>Some page</h1>
    </div>
  );
}