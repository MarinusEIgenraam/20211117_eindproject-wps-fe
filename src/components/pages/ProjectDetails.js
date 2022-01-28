////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import styled from 'styled-components';
////////////////////
//// Environmental
import { Column, Divider, PageContainer } from "../../styles/Layout";
import { UtilityContext } from "../../context/UtilityProvider";
import { useParams } from "react-router-dom";
import { FormWindow } from "../../styles/Form";
import { Category, Collaborators, ListMetaData, ProjectHeader, } from "../../styles/TextLayout";
import { Img, ProjectHero } from "../../styles/Images";
import { getProjectComments } from "../../services/controllers/Comments";
import { getOneProject } from "../../services/controllers/Projects";
import Comment from "../shared/elements/Comments/Comment";
import { Description, Owner, Users, Votes } from "../../styles/Typography";



export default function Project({}) {
    const source = axios.CancelToken.source();
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ loadedProject, setLoadedProject ] = useState();
    const [ loadedComments, setLoadedComments ] = useState();

    const { id } = useParams();

    useEffect(() => {

        const getData = async () => {
            setLoadedComments(await getOneProject(setIsLoading, setHasError, id))
            setLoadedProject(await getProjectComments(setIsLoading, setHasError, id));
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <FormWindow>
                <ProjectHeader>
                    <Text>
                        <Title>

                            { loadedProject?.projectName }

                        </Title>
                        <Collaborators>Collaborators: { loadedProject?.collaborators.map((user) =>
                            <span>{ user.username }</span>) }</Collaborators>

                        <Votes>{ loadedProject?.voteCount } vote{ loadedProject?.voteCount > 1 && `'s` } on this
                            project</Votes>
                        <Owner>Project owner: { loadedProject?.projectOwner.username }</Owner>
                        <Category>{ loadedProject?.category.name }</Category>
                    </Text>
                    <ProjectHero>
                        <Img src={ loadedProject?.url }/>
                    </ProjectHero>
                </ProjectHeader>
                <ListMetaData>
                    <Users>

                        <Divider/>
                        <Description>{ loadedProject?.description }</Description>
                        <Divider/>

                    </Users>
                </ListMetaData>
                {/*{ loadedProject?.projectTaskList &&*/ }
                {/*    loadedProject?.projectTaskList.map((task) =>*/ }
                {/*        (*/ }
                {/*            <ListItem>*/ }
                {/*                { task.taskName } { task.taskOwner.username }*/ }
                {/*            </ListItem> )*/ }
                {/*    ) }*/ }

            </FormWindow>

            <FormWindow>
                <Column>

                    <h3>Comments</h3>
                    <ol>


                        { loadedComments &&
                            loadedComments.map((comment) =>
                                (
                                    <Comment comment={ comment }/>
                                )) }

                    </ol>
                </Column>
                <div>
                </div>
            </FormWindow>

            {/*<Row>*/ }
            {/*    <Column>*/ }
            {/*        /!*<ProjectName to={ `/projects/${loadedProject.projectId}` }>{ loadedProject.projectName }</ProjectName>*!/*/ }

            {/*        <Details>*/ }
            {/*            <ListMetaData>*/ }
            {/*                <Category>{ loadedProject?.category.name }</Category>*/ }
            {/*                <Users>*/ }
            {/*                    <Owner>{ loadedProject?.projectOwner.username }</Owner>*/ }
            {/*                    <Collaborators>{ loadedProject?.collaborators.map((user)=> <span>{ user.username }</span>) }</Collaborators>*/ }
            {/*                    <Votes>{ loadedProject?.voteCount } vote{ loadedProject?.voteCount > 1 && `'s` } on this*/ }
            {/*                        project</Votes>*/ }
            {/*                </Users>*/ }
            {/*            </ListMetaData>*/ }
            {/*            <Description>{ loadedProject?.description }</Description>*/ }
            {/*        </Details>*/ }
            {/*    </Column>*/ }
            {/*    <ProjectHero>*/ }
            {/*        <Img src={ loadedProject?.url }/>*/ }
            {/*    </ProjectHero>*/ }
            {/*</Row>*/ }
            {/*<Row>*/ }

            {/*<ListItem>*/ }
            {/*    {loadedProject?.projectTaskList &&*/ }
            {/*        loadedProject?.projectTaskList.map((task)=> console.log(task))}*/ }
            {/*</ListItem>*/ }
            {/*</Row>*/ }
        </PageContainer>
    )
}


const Title = styled.h3`

`

const Text = styled.div`
  width: 50%;
`

/** Created by ownwindows on 04-01-22 **/
