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
            <ProjectData>
                <ProjectName>{ project.projectName }</ProjectName>

                <Details>
                    <Meta>
                        <Category>{ project.category.name }</Category>
                        <Users>
                            <Owner>{ project.projectOwner.username }</Owner>
                            <Collaborators>{ project.project?.collaborators }</Collaborators>
                        </Users>
                        <Votes>{project.voteCount}Users up-voted this project</Votes>
                    </Meta>
                    <Description>{ project.description }</Description>
                </Details>
            </ProjectData>

            <ProjectHero src={ project.url }/>
            { project.projectTaskList.map((task) => <h1>{ task }</h1>) }
        </ListItem>
    )
}

const ProjectData = styled.div`
 flex-grow: 3;
`
const ListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
`
const Meta = styled.div`
  width: max-content;
  flex-grow: 1;

`

const Description = styled.div`
  width: min-content;
  text-align: start;
  flex-grow: 2;
  text-justify: newspaper;
`
const Details = styled.div`
  flex-grow: 2;
  width: 300px;
  display: flex;
`
const ProjectHero = styled.img`
  //flex-grow: 1;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  width: auto;
  max-height: 200px;
  aspect-ratio: 1 / 1;
`
const ProjectName = styled.h2`
  flex-grow: 3;
  color: ${ props => props.theme.header };

`

const Category = styled.div`
  position: relative;
  top: -5px;
  font-size: 0.9rem;
  font-weight: 300;
  font-style: italic;

`

const Votes = styled.footer`

`

const Owner = styled.span`
  font-weight: 500;
`

const Collaborators = styled.span`

`

const Users = styled.div`
  font-size: 0.9rem;

`
/** Created by ownwindows on 04-01-22 **/
