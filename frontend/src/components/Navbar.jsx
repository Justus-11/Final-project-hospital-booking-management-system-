import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className='w-36 sm:w-44 cursor-pointer'
        src={assets.logo}
        alt='Logo'
      />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/' className='group'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-3/5 m-auto transition-all' />
        </NavLink>

        <NavLink to='/doctors' className='group'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-3/5 m-auto transition-all' />
        </NavLink>

        <NavLink to='/about' className='group'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-3/5 m-auto transition-all' />
        </NavLink>

        <NavLink to='/contact' className='group'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-3/5 m-auto transition-all' />
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt='Profile' />
            <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown' />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-white shadow-md rounded-lg flex flex-col gap-4 p-4'>
                <p
                  onClick={() => navigate('/my-profile')}
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block'
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt='Menu'
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg p-6 z-30 transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <img
            onClick={() => navigate('/')}
            className='w-32 cursor-pointer'
            src={assets.logo}
            alt='Logo'
          />
          <img
            onClick={() => setShowMenu(false)}
            className='w-5 cursor-pointer'
            src={assets.cross_icon}
            alt='Close'
          />
        </div>

        {/* Navigation Links */}
        <ul className='flex flex-col gap-5 text-gray-700 font-medium'>
          <NavLink onClick={() => setShowMenu(false)} to='/'>HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors'>ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact'>CONTACT</NavLink>

          {token && (
            <>
              <NavLink onClick={() => setShowMenu(false)} to='/my-profile'>MY PROFILE</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/my-appointments'>MY APPOINTMENTS</NavLink>
            </>
          )}

          {!token ? (
            <button
              onClick={() => {
                navigate('/login')
                setShowMenu(false)
              }}
              className='bg-primary text-white py-2 rounded-full'
            >
              Create Account
            </button>
          ) : (
            <button
              onClick={() => {
                setToken(false)
                setShowMenu(false)
              }}
              className='border border-red-500 text-red-500 py-2 rounded-full'
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
