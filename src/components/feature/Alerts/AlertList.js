////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import { Container, DetailRow } from "../../../styles/Layout";
import { ListItem, UnsortedList } from "../../../styles/List";
import { deleteAlert, getAlertsFor } from "../../../services/controllers/Alerts";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Tooltip from "../../shared/elements/messages/Tooltip";
import { VisualContainer } from "../../../styles/Windows";
import { WindowVisual } from "../../../styles/Images";
import alertBackground from "../../../assets/images/visual_alerts.svg";

import styled from 'styled-components';


export default function AlertList() {
    const utilityContext = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);

    const [ listOpen, setListOpen ] = useState(false);
    const [ loadedAlerts, setLoadedAlerts ] = useState();
    const [ sortingFilter, setSortingFilter ] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();

        getAlertsFor(utilityContext, user, sortingFilter).then(response => setLoadedAlerts(response.data.content))

        return function clearData() {
            source.cancel();
        };

    }, [ utilityContext.creationCount, sortingFilter ]);

    const submitDelete = async (id) => {
        console.log(id)
        return deleteAlert(utilityContext, id)
    };

    return (
        <>
            { loadedAlerts?.length > 0 &&
                <AlertContainer>
                    <UnsortedList>
                        { loadedAlerts.map((alert, index) => (
                            <ListItem key={ index }>

                                <DetailRow key={ index }>
                                    <h4>{ alert.createdAt } <span
                                        className="light">| { alert.title } | { alert.text } </span>
                                    </h4>

                                    <Tooltip text="Delete">
                                        <IoIosRemoveCircleOutline
                                            size={ 20 }
                                            type="button"
                                            onClick={ () => submitDelete(alert.id) }
                                        />
                                    </Tooltip>
                                </DetailRow>


                            </ListItem>
                        )) }
                    </UnsortedList>
                    <VisualContainer>

                        <WindowVisual src={ alertBackground }/>
                    </VisualContainer>
                </AlertContainer>
            }

        </>
)
}


const AlertContainer = styled(Container)`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  width: 70vw;

`

/** Created by ownwindows on 18-01-22 **/
