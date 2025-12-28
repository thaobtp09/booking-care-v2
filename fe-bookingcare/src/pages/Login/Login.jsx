import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const history = useHistory(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      history.push('/'); // 
    } catch (err) {
      setError('Email hoặc mật khẩu không đúng');
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;

/* ===== CSS INLINE ===== */
const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    background: '#fff',
    padding: 32,
    borderRadius: 12,
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
};
