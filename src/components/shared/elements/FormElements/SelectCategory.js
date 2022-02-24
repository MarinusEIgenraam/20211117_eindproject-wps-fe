////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../../context/UtilityProvider";
import { Select, SelectContainer } from "../../../../styles/Input";
import { getCategories } from "../../../../services/controllers/Category";
import { getUsers } from "../../../../services/controllers/Users";

export default function SelectCategory({ area, register, parent, defaultValue }) {
    const utilityContext = useContext(UtilityContext);
    const [ loadedCategories, setLoadedCategories ] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getCategories(utilityContext).then(response => setLoadedCategories(response.data))
        const response = getCategories(utilityContext)
        {
            response && setLoadedCategories(response.data)
        }

        return function clearData() {
            source.cancel();
        };
    }, []);

    return (
        <SelectContainer area={area} id="SelectContainer">
            <Select { ...register(`${ parent }`) }>
                <option key={ defaultValue } value={ defaultValue }>{ defaultValue }</option>
                { loadedCategories &&
                    loadedCategories.map((category, index) => {
                            return (
                                <option key={ index } value={ category.id }>{ category.name }</option>
                            )
                        }
                    )
                }

            </Select>
        </SelectContainer>
    );
}


/** Created by ownwindows on 08-01-22 **/
