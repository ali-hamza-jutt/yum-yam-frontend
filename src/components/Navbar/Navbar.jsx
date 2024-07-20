import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Navbar({ onSubmit }) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        navigate('/'); // Redirect to login page or another appropriate page
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Wrapper>
      <LogoWrapper>
        <LogoText>
          <a href='/'>
            <h1>YumYam</h1>
          </a>
        </LogoText>
      </LogoWrapper>
      <MenuIcon onClick={toggleMenu}>
        <MenuRoundedIcon />
      </MenuIcon>
      <DesktopMenu>
        <SearchWrapper>
          <SearchBarWrapper>
            <form onSubmit={onSearchSubmit}>
              <SearchInput
                type="text"
                placeholder="Search 2M+ recipes"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </form>
          </SearchBarWrapper>
        </SearchWrapper>
        <ProfileWrapper>
          {isAuthenticated ? (
            <LogoutWrapper>
              <button onClick={handleLogout}>Logout</button>
            </LogoutWrapper>
          ) : (
            <LoginWrapper>
              <a href="/">
                <ProfileIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 32, height: 32 }}
                  />
                </ProfileIcon>
                <ProfileName>
                  <p>Junaid</p>
                </ProfileName>
              </a>
            </LoginWrapper>
          )}
        </ProfileWrapper>
        <MenuWrapper>
          <MenuOption>
            <Link to="/dinners">Dinners</Link>
          </MenuOption>
          <MenuOption>
            <Link to="/easyToCook">Easy to Cook</Link>
          </MenuOption>
          <MenuOption>
            <Link to="/childFriendly">Child Friendly</Link>
          </MenuOption>
          <MenuOption>
            <Link to="/breakfast">Breakfast</Link>
          </MenuOption>
        </MenuWrapper>
      </DesktopMenu>
      <DropdownMenu isOpen={isMenuOpen}>
        <MenuIcon onClick={toggleMenu}>
          <MenuRoundedIcon />
        </MenuIcon>
        <SearchWrapper>
          <SearchBarWrapper>
            <form onSubmit={onSearchSubmit}>
              <SearchInput
                type="text"
                placeholder="Search 2M+ recipes"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </form>
          </SearchBarWrapper>
        </SearchWrapper>
        <ProfileWrapper>
          {isAuthenticated ? (
            <LogoutWrapper>
              <button onClick={handleLogout}>Logout</button>
            </LogoutWrapper>
          ) : (
            <LoginWrapper>
              <a href="/">
                <ProfileIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 32, height: 32 }}
                  />
                </ProfileIcon>
                <ProfileName>
                  <p>Junaid</p>
                </ProfileName>
              </a>
            </LoginWrapper>
          )}
        </ProfileWrapper>
        <MenuWrapper>
          <MenuOption>
            <Link to="/dinners">Dinners</Link>
          </MenuOption>
          <MenuOption>
            <Link to="/easyToCook">Easy to Cook</Link>
          </MenuOption>
          <MenuOption>
            <Link to="/childFriendly">Child Friendly</Link>
          </MenuOption>
          <MenuOption>
            <Link to="/breakfast">Breakfast</Link>
          </MenuOption>
        </MenuWrapper>
      </DropdownMenu>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 12px 4px 4px 12px;
  background-color: white;
  color: black;
  margin: 0.5rem 0 1.5rem 0;
  position: relative;
`;

const LogoWrapper = styled.div`
  display: flex;
  a {
    text-decoration: none;
    color: #000000;
  }
`;

const LogoText = styled.div`
  h1 {
    font-family: "Playwrite PL", cursive;
  }
`;

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left:8px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  background-color: white;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding-top:2.5vh;
`;

const SearchWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  width:100%;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #efefef;
  border-radius: 50px;
  height: 36px;
  margin: 0 25px;
  padding: 0 10px;
  width: 100%;

  form {
    display: flex;
    flex: 1;
  }
`;

const SearchInput = styled.input`
  background-color: #efefef;
  width: 100%;
  border: none;
  font-size: 16px;
  margin-right: 5px;
  padding-right: 20px;

  &:focus {
    outline: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #000000;
`;

const ProfileWrapper = styled.div`
  display: flex;
  padding: 10px 0;


  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const ProfileIcon = styled.div`
  margin: 0 7px;
`;

const ProfileName = styled.div`
  font-weight: 600;
`;

const LoginWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    margin: 0 20px 0 0;
    text-decoration: none;
    color: black;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px 0 0;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    margin: 0;
  }
`;

const MenuOption = styled.div`
  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: black;
    font-size: 14px;
    font-weight: 500;
  }
`;

const LogoutWrapper = styled.div`
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
