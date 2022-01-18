////////////////////
//// Build
import React, { useContext } from 'react'
import { AuthContext } from "../../../context/AuthProvider";
import CreateProject from "../../layout/forms/Project/CreateProject";
import CreateBlog from "../../layout/forms/Blog/CreateBlog";
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
                <CreateBlog/>
            }
            { ( user.authorities === "Project manager" || "Project lord" ) &&
                <CreateProject/>
            }
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
