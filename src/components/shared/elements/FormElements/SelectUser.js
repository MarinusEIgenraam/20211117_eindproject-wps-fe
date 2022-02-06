////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { UtilityContext } from "../../../../context/UtilityProvider";
import axios from "axios";
////////////////////
//// Environmental
import { Select, SelectContainer } from "../../../../styles/Input";
import { getUsers } from "../../../../services/controllers/Users";

export default function SelectUser({ register, parent, defaultValue }) {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ loadedUsers, setLoadedUsers ] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getData = async () => {
            const userData = await getUsers(setHasError, setIsLoading);
            setLoadedUsers(userData.data.content)
            console.log(userData)
        }
        getData()

        return function clearData() {
            source.cancel();
        };
    }, []);

    return (
        <SelectContainer id="SelectContainer">
            <Select { ...register(`${ parent }Owner`) }>
                <option key={ defaultValue } value={ defaultValue }>{ defaultValue }</option>
                { loadedUsers &&
                    loadedUsers.map((user, key) => {
                            return (
                                <option key={ key } value={ user.username }>{ user.username }</option>
                            )
                        }
                    )
                }

            </Select>
        </SelectContainer>
    );
}


/** Created by ownwindows on 08-01-22 **/
