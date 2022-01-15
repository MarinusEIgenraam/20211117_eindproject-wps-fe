////////////////////
//// Build
import React from 'react'
import { Column, Row } from "../../shared/elements/Layout";
import { ProjectName } from "../../shared/elements/Navigation";
import Users from "../../pages/Users/Users";
import {
    Category,
    Collaborators,
    Description,
    Details,
    ListMetaData,
    Owner,
    Votes
} from "../../shared/elements/TextLayout";
import { ProjectHero } from "../../shared/elements/Images";
import { ListItem, ListWrapper, TaskList } from "../../shared/elements/List";


////////////////////
//// Environmental

////////////////////
//// External

export default function ProjectDetails({ project }) {

    return (
        <ListItem key={project.projectId}>
            <Row>
                <Column>
                    <ProjectName to={ `/projects/${project.projectId}` }>{ project.projectName }</ProjectName>

                    <Details>
                        <ListMetaData>
                            <Category>{ project.category.name }</Category>
                            <Users>
                                <Owner>{ project.projectOwner.username }</Owner>
                                <Collaborators>{ project.collaborators.map((user)=> <span>{ user.username }</span>) }</Collaborators>
                                <Votes>{ project.voteCount } vote{ project.voteCount > 1 && `'s` } on this
                                    project</Votes>
                            </Users>
                        </ListMetaData>
                        <Description>{ project.description }</Description>
                    </Details>
                </Column>
                <ProjectHero>
                    <img src={ project.url }/>
                </ProjectHero>
            </Row>
            <ListWrapper>

                <TaskList>
                    {project.projectTaskList &&
                    project.projectTaskList.map((task)=> console.log(task))}
                </TaskList>
            </ListWrapper>
        </ListItem>
    )
}







/** Created by ownwindows on 04-01-22 **/
