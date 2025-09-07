import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All-Posts",
      slug: "all-posts",
      active: authStatus
    },
    {
      name: "Add-Post",
      slug: "add-post",
      active: authStatus
    }
  ]

  return (
    <header className={`py-3 fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      isScrolled ? 'bg-gradient-to-r from-[#1a1a1a] via-[#1c1c1c] to-[#1a1a1a] shadow-lg' : 'bg-gradient-to-r from-[#1a1a1a] via-[#1c1c1c] to-[#1a1a1a]'
    } border-b border-white/10`}>
       <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width={"140px"}/>
            </Link>
          </div>
          <ul className='flex ml-auto gap-1'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} className='inline-block px-4 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-white bg-transparent hover:bg-white/10 transition'>
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
       </Container>
    </header>
  )
}

export default Header