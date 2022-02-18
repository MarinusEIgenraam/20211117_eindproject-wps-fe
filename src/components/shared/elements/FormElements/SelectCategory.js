////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../../../context/UtilityProvider";
import { Select, SelectContainer } from "../../../../styles/Input";
import { getCategories } from "../../../../services/controllers/Category";

export default function SelectCategory({ area, register, parent, defaultValue }) {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ loadedCategories, setLoadedCategories ] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getData = async () => {
            const result = await getCategories(setHasError, setIsLoading);
            setLoadedCategories(result.data)
        }
        getData()

        return function clearData() {
            source.cancel();
        };
    }, []);

    return (
        <SelectContainer area={area} id="SelectContainer">
            <Select { ...register(`${ parent }`) }>
                <option key={ defaultValue } value={ defaultValue }>{ defaultValue }</option>
                { loadedCategories &&
                    loadedCategories.map((category, key) => {
                            return (
                                <option key={ key } value={ category.id }>{ category.name }</option>
                            )
                        }
                    )
                }

            </Select>
        </SelectContainer>
    );
}


/** Created by ownwindows on 08-01-22 **/
