import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaEnvelope } from 'react-icons/fa';


function MainScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h3 style={styles.author}>메인화면</h3>
        <p style={styles.quote}>
          메인화면
        </p>
      </div>
      <div style={styles.navbar}>
        <div onClick={() => navigate('/home')} style={styles.navItem}>
          <FaHome size={24} />
          <span style={styles.navText}>홈</span>
        </div>
        
        <div onClick={() => navigate('/payment')} style={styles.centralNavItem}>
          <FaEnvelope size={28} style={{ color: '#e67a00' }} />
        </div>
        
        <div onClick={() => navigate('/login')} style={styles.navItem}>
          <FaUser size={24} />
          <span style={styles.navText}>My</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8e5a4', 
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  author: {
    fontSize: '16px',
    color: '#5a4635',
    margin: '10px 0',
  },
  quote: {
    fontSize: '18px',
    color: '#5a4635',
    textAlign: 'center',
    padding: '0 20px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    padding: '10px',
    borderTop: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#333',
  },
  centralNavItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    marginTop: '-30px',
    cursor: 'pointer',
  },
  navText: {
    fontSize: '12px',
    marginTop: '4px',
  },
};

export default MainScreen;