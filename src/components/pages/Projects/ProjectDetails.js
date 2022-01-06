////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function ProjectDetails({ project }) {
    console.log(project);

    return (
        <ListItem>
            <Info>
                <ProjectName>{ project.projectName }</ProjectName>
                <Description>{ project.description }</Description>
                <Category>{ project.category.name }</Category>
                <Users>
                    <Owner>{ project.projectOwner.username }</Owner>
                    <Collaborators>{ project.project?.collaborators }</Collaborators>
                </Users>
            </Info>
            <ProjectHero src={ project.url }/>
            { project.projectTaskList.map((task) => <h1>{ task }</h1>) }
        </ListItem>
    )
}
const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
`
const Info = styled.div`
    flex-grow: 3;
`
const Category = styled.div`
`
const ProjectName = styled.h2`


`
const Description = styled.div`

`

const Owner = styled.span`

`

const Collaborators = styled.span`

`

const Users = styled.div`

`

const ProjectHero = styled.img`
  border: solid var(--box-border-medium) var(--secondary-quarter);
  width: auto;
  height: 100%;
`
/** Created by ownwindows on 04-01-22 **/
