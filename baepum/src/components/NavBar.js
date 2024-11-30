import { FaHome, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NavBar() {
    const navigate = useNavigate();
    
    return (
        <NavBarContainer>
            <NavItem onClick={() => navigate('/')}>
                <FaHome size={24} />
                <NavText>홈</NavText>
            </NavItem>
            
            <CentralNavItem onClick={() => navigate('/')}>
                <FaEnvelope size={28} />
            </CentralNavItem>
            
            <NavItem onClick={() => navigate('/mypage')}>
                <FaUser size={24} />
                <NavText>My</NavText>
            </NavItem>
        </NavBarContainer>
    );
}

const NavBarContainer = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border-top: 1px solid #ddd;
    background-color: #fff;
    z-index: 1000;
    padding: 10px 0;
`;

const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    color: #333;
    
    &:hover {
        color: #d4a373;
    }
`;

const CentralNavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #d4a373;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: -30px;
    cursor: pointer;
    color: white;
    
    &:hover {
        background-color: #c49363;
    }
`;

const NavText = styled.span`
    font-size: 12px;
    margin-top: 4px;
`;

export default NavBar;