
import {NavLink, Outlet} from 'react-router-dom';

const RootLayout = () => {
  return (<>

    
         <NavLink to='projects'>
        Projects
        </NavLink>
        <NavLink to='about'>
            About
        </NavLink>
 
    <main>
        <Outlet/>
    </main>
 </> )
}

export default RootLayout