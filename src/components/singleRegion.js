import {useState, useEffect} from "react";

const SingleRegion = ({regionName, fuels}) => {

    return (
        <>
        <h3>{regionName}</h3>
        <p>
            {fuels.map((fuel) => {
                return(
                    <>
                        <p class="fuel">{Object.keys(fuel)[0]}: </p>
                        <p class="perc">{fuel[Object.keys(fuel)[0]]}%</p>
                    </>
                )
            })}
        </p>
        </>
    )
}

export default SingleRegion