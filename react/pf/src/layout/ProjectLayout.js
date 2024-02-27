import { NavLink, Outlet } from 'react-router-dom'; 

const ProjectLayout = () => {
  return (<>
  
    <NavLink to='p1'>p1</NavLink>

    <NavLink to='p2'>p2</NavLink>
    
    <NavLink to='p2'>p3</NavLink>
    <main>
        <Outlet/>
    </main>

</>  )
}

export default ProjectLayout