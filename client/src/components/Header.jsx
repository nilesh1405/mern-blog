import React from 'react'
import { Navbar, TextInput, Button } from 'flowbite-react'
import { Link , useLocation } from 'react-router-dom'
import {AiOutlineSearch as SearchIcon} from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'> 
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Nilesh's</span>
            Blog
        </Link>
        <form>
            <TextInput 
                type='text' 
                placeholder='Search...' 
                rightIcon={SearchIcon} 
                className='hidden lg:inline'
            />
            <Button className='lg:hidden w-12 h-10' color='gray' pill={true}>
                <SearchIcon/>
            </Button>
        </form>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill={true}>
                <FaMoon/>
            </Button>
            <Link to='/sign-in'>
                <Button  gradientDuoTone='purpleToBlue' outline={true}>
                    Sign In
                </Button>
            </Link>
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link as={Link} to="/home" active={path === '/home'}>
                Home
            </Navbar.Link>
            <Navbar.Link as={Link} to="/about" active={path === '/about'}>
                About
            </Navbar.Link>
            <Navbar.Link as={Link} to="/projects" active={path === '/projects'}>
                Projects
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header