///////////////////////
//// Build
import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components';


///////////////////////
//// Internal
import './App.scss';
import Navbar from "./components/layout/Navigation/Navbar";
import PrivateRoutes from "./router/PrivateRoutes";
import Portal from "./components/pages/Portal";
import Home from "./components/pages/Home";
import Blogs from "./components/pages/Blogs";
import Projects from "./components/pages/Projects";
import Register from "./components/pages/Register";
import About from "./components/pages/About";
import ProjectDetails from "./components/shared/views/ProjectDetails";
import BlogDetails from "./components/shared/views/BlogDetails";
import Users from "./components/pages/Users";
import UserProfile from "./components/shared/views/UserProfile";
import NoComponentFound from "./components/shared/views/NoComponentFound";

function App() {
    const [ value, setValue ] = useState(``);
    const [ formState, setFormState ] = useState({})


    return (
        <Container>
            <Navbar/>

            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/blogs' element={ <Blogs/> }/>
                <Route path='/blogs/:id' element={ <BlogDetails/> }/>
                <Route path='/projects' element={ <Projects/> }/>
                <Route path='/projects/:id' element={ <ProjectDetails/> }/>
                <Route path='/register' element={ <Register/> }/>
                <Route path='/register' element={ <Register/> }/>
                <Route path='/about' element={ <About/> }/>

                <Route path="users" element={<Users/>}>
                    <Route path=':id' element={<UserProfile/>}/>

                    <Route path='me' element={
                               <PrivateRoutes>
                                   <Portal/>
                               </PrivateRoutes>
                           }
                    />
                </Route>
                <Route path="*" element={<NoComponentFound/>}/>
            </Routes>


        </Container>
    );
}

const Container = styled.div`
  background: var(--quaternary-quarter);
  height: 120vh;
`;

export default App;
