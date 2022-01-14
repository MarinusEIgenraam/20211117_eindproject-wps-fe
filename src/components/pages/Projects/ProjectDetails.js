////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


////////////////////
//// Environmental

////////////////////
//// External

export default function ProjectDetails({ project }) {
    console.log(project);

    return (
        <ListItem key={project.projectId}>
            <Project>
                <ProjectData>
                    <ProjectName to={ `/projects/${project.projectId}` }>{ project.projectName }</ProjectName>

                    <Details>
                        <Meta>
                            <Category>{ project.category.name }</Category>
                            <Users>
                                <Owner>{ project.projectOwner.username }</Owner>
                                <Collaborators>{ project.collaborators.map((user)=> <span>{ user.username }</span>) }</Collaborators>
                                <Votes>{ project.voteCount } vote{ project.voteCount > 1 && `'s` } on this
                                    project</Votes>
                            </Users>
                        </Meta>
                        <Description>{ project.description }</Description>
                    </Details>
                </ProjectData>
                <ProjectHero>
                    <img src={ project.url }/>
                </ProjectHero>
            </Project>
            <Tasks>

                <TaskData>
                    {project.projectTaskList &&
                    project.projectTaskList.map((task)=> console.log(task))}
                </TaskData>
            </Tasks>
        </ListItem>
    )
}

const Tasks = styled.div`

`
const Project = styled.div`
  display: flex
`
const TaskData = styled.div`
`
const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  align-items: baseline;
`
const ProjectData = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Meta = styled.div`
  display: flex;
  flex: 2 0;
  flex-direction: column;
  justify-content: space-between;


`
const Description = styled.div`
  flex: 4;
  padding: 0 1rem;
`
const Details = styled.div`
  flex: 2;
  display: flex;
`
const ProjectHero = styled.div`
  flex: 0 4 auto;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  min-width: 100px;
  background: blue;
  aspect-ratio: 1 / 1;
`
const ProjectName = styled(NavLink)`
  //flex-grow: 3;
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
  font-size: 0.9rem;


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
