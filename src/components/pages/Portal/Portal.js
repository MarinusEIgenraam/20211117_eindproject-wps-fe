////////////////////
//// Build
import React, { useContext } from 'react'
import { AuthContext } from "../../../context/AuthProvider";
import ProjectCreation from "../../layout/forms/Project/ProjectCreation";
import BlogCreation from "../../layout/forms/Blog/BlogCreation";
import { HeaderContainer } from "../../shared/elements/TextLayout";
import { H1 } from "../../shared/elements/Text";
import { PageContainer } from "../../shared/elements/Layout";

////////////////////
//// Environmental

////////////////////
//// External

export default function Portal() {
    const { isAuth, user } = useContext(AuthContext);
    console.log(user.authorities)

    return (
        <PageContainer>
            <HeaderContainer> <H1>
                How are you doing { user.username }
            </H1>
            </HeaderContainer>
            { ( user.authorities === "Project lord" ) &&
                <BlogCreation/>
            }
            { ( user.authorities === "Project manager" || "Project lord" ) &&
                <ProjectCreation/>
            }
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
