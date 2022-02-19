////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import { Container, DetailRow } from "../../../styles/Layout";
import { CenteredSubHeader } from "../../../styles/Typography";
import { ListItem, UnsortedList } from "../../../styles/List";
import { getAlertsFor } from "../../../services/controllers/Alerts";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { AiFillDelete } from "react-icons/all";
import Tooltip from "../../shared/elements/messages/Tooltip";

export default function AlertList() {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);

    const [ listOpen, setListOpen ] = useState(false);
    const [ loadedAlerts, setLoadedAlerts ] = useState();
    const [ sortingFilter, setSortingFilter ] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getData = async () => {
            const response = await getAlertsFor(setHasError, setIsLoading, user, sortingFilter)
            {
                response && setLoadedAlerts(response.content)
            }
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ sortingFilter ]);

    return (
        <Container className="single">
            <UnsortedList>
                { loadedAlerts && loadedAlerts.map((alert, index) => (
                    <ListItem className="alert-list" key={ index }>

                        <DetailRow key={ index }>
                            <h4>{ alert.createdAt } <span
                                className="light">{ alert.createdAt } | { alert.title } | { alert.text } </span>
                            </h4>

                            <Tooltip text="Delete">
                                <IoIosRemoveCircleOutline
                                    size={ 20 }
                                    type="button"
                                    // onClick={ () => setAddTask(false) }
                                />
                            </Tooltip>
                        </DetailRow>


                    </ListItem>
                )) }
            </UnsortedList>
        </Container>
    )
}


/** Created by ownwindows on 18-01-22 **/
