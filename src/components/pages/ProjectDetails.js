////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { Column, Divider, PageContainer } from "../shared/styling/Layout";
import axios from "axios";
import { UtilityContext } from "../../context/UtilityProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
import { FormWindow } from "../shared/styling/Form";
import styled from 'styled-components';
import { Category, Collaborators, Description, ListMetaData, Owner, Users, Votes } from "../shared/styling/TextLayout";
import { Img, ProjectHero } from "../shared/styling/Images";
import { getProjectComments } from "../../services/controllers/Comments";
import { getOneProject } from "../../services/controllers/Projects";
import Comment from "./Projects/Comment";


////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;
////////////////////
//// External


export default function Project({}) {
    const source = axios.CancelToken.source();
    const { setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ hasError, setHasError ] = useState(false);
    const [ loadedProject, setLoadedProject ] = useState();
    const [ loadedComments, setLoadedComments ] = useState();

    const token = localStorage.getItem('token');
    const API_URL = `${ REACT_APP_API_URL }projects/`;
    const { id } = useParams();

    useEffect(() => {

        const getData = async () => {
            setHasError(false);
            setIsLoading(true)
            const project = await getOneProject(id)
            const comments = await getProjectComments(id)
            setLoadedComments(comments)
            setLoadedProject(project);
            setIsLoading(false)
        }

        console.log(loadedComments)
        getData()
        console.log(loadedProject)

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

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-height: 200px;

`

const Title = styled.h3`

`

const Text = styled.div`
  width: 50%;

`

/** Created by ownwindows on 04-01-22 **/
