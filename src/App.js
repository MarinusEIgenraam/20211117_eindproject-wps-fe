///////////////////////
//// Build
import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components';


///////////////////////
//// Internal
import Navbar from "./components/shared/views/Navbar";
import PrivateRoutes from "./router/PrivateRoutes";
import Portal from "./components/pages/Portal";
import Home from "./components/pages/Home";
import BlogOverview from "./components/pages/Blogs/BlogOverview";
import Register from "./components/pages/Register/Register";
import About from "./components/pages/About";
import ProjectDetails from "./components/pages/ProjectDetails";
import Blog from "./components/pages/Blog";
import UserOverview from "./components/pages/UserOverview";
import UserProfile from "./components/pages/UserProfile";
import NoComponentFound from "./components/pages/NoComponentFound";
import Footer from "./components/shared/views/Footer";
import ProjectOverview from "./components/pages/ProjectOverview";

function App() {
    const [ value, setValue ] = useState(``);
    const [ formState, setFormState ] = useState({})


    return (
        <AppContainer>
            <Navbar/>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/blogs' element={ <BlogOverview/> }/>
                <Route path='/blogs/:id' element={ <Blog/> }/>
                <Route path='/projects' element={ <ProjectOverview/> }/>
                <Route path='/projects/:id' element={ <ProjectDetails/> }/>
                <Route path='/register' element={ <Register/> }/>
                {/*<Route path='/Login' element={ <Login/> }/>*/ }
                <Route path='/about' element={ <About/> }/>

                <Route path="/users" element={ <UserOverview/> }/>
                <Route path='/users/:username' element={ <UserProfile/> }/>
                <Route path='/me' element={
                    <PrivateRoutes>
                        <Portal/>
                    </PrivateRoutes>
                }
                />
                <Route path="*" element={ <NoComponentFound/> }/>
            </Routes>

            <Footer/>

        </AppContainer>
    );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${ props => props.theme.text };
  background: ${ props => props.theme.background };



`;

export default App;
