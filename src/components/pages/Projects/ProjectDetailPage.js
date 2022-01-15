////////////////////
//// Build
import React from 'react'
import { ListItem } from "../../shared/elements/List";
import { ProjectName } from "../../shared/elements/Navigation";
import {
    Category,
    Collaborators,
    Description,
    Details,
    ListMetaData,
    Owner,
    Users,
    Votes
} from "../../shared/elements/TextLayout";
import { Img, ProjectHero } from "../../shared/elements/Images";
import { Column, Row } from "../../shared/elements/Layout";


////////////////////
//// Environmental

////////////////////
//// External

export default function ProjectDetailPage({ project }) {
    console.log(project);

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
                    <Img src={ project.url }/>
                </ProjectHero>
            </Row>
            <Row>

                <ListItem>
                    {project.projectTaskList &&
                    project.projectTaskList.map((task)=> console.log(task))}
                </ListItem>
            </Row>
        </ListItem>
    )
}

/** Created by ownwindows on 04-01-22 **/
