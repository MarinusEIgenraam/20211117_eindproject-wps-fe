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
import Portal from "./components/pages/Portal/Portal";
import Home from "./components/pages/Home/Home";
import Blogs from "./components/pages/Blogs/Blogs";
import Projects from "./components/pages/Projects/Projects";
import Register from "./components/pages/Register/Register";
import About from "./components/pages/About/About";
import ProjectDetails from "./components/pages/Projects/ProjectDetails";
import Blog from "./components/pages/Blogs/Blog";
import Users from "./components/pages/Users/Users";
import UserProfile from "./components/pages/Users/UserProfile";
import NoComponentFound from "./components/pages/NoComponentFound";

function App() {
    const [ value, setValue ] = useState(``);
    const [ formState, setFormState ] = useState({})


    return (
        <Container>
            <Navbar/>

            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/blogs' element={ <Blogs/> }/>
                <Route path='/blogs/:id' element={ <Blog/> }/>
                <Route path='/projects' element={ <Projects/> }/>
                <Route path='/projects/:id' element={ <ProjectDetails/> }/>
                <Route path='/register' element={ <Register/> }/>
                {/*<Route path='/Login' element={ <Login/> }/>*/}
                <Route path='/about' element={ <About/> }/>

                <Route path="/users" element={<Users/>}>
                    <Route path=':id' element={<UserProfile/>}/>
                </Route>
                <Route path='/me' element={
                    <PrivateRoutes>
                        <Portal/>
                    </PrivateRoutes>
                }
                />
                <Route path="*" element={<NoComponentFound/>}/>
            </Routes>


        </Container>
    );
}

const Container = styled.div`
  background: ${props => props.theme.background};
  height: 120vh;
`;

export default App;
