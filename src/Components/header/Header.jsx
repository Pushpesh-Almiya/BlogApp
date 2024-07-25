import React, { useEffect, useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import './Header.css'; 

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await authService.getCurrentUser();
      const user = currentUser.name;
      setUserName(user);
    };
    getUser();
  }, [navigate, authStatus]);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className='py-3 shadow bg-gray-800'>
      <Container>
        <nav className='flex justify-between items-center font-semibold text-gray-100'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <div className='block lg:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-gray-100 focus:outline-none hamburger ${isOpen ? 'open' : ''}`}
            >
              <div className='line top'></div>
              <div className='line middle'></div>
              <div className='line bottom'></div>
            </button>
          </div>
          <ul
            className={`${
              isOpen ? 'block' : 'hidden'
            } lg:flex flex-col lg:flex-row ml-auto`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='my-2 lg:my-0'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-900 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='flex justify-center items-center my-2 lg:my-0'>
                <div className='hover:text-gray-900'>
                  <LogoutBtn />
                </div>
                <div className='pl-2'>{userName} 🤡</div>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
