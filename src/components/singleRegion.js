import {useState, useEffect} from "react";

const SingleRegion = ({regionName, fuels}) => {

    console.log("xxx: ", regionName)
    console.log("zzz: ", fuels)
    // console.log("yyy: ", fuelsPerc)

    return (
        <>
        <h3>{regionName}</h3>
        <p>
            {fuels.map((fuel) => {
                return(
                    <p>
                        <span>{Object.keys(fuel)[0]}</span>: 
                        <span>{fuel[Object.keys(fuel)[0]]}</span>
                    </p>
                )
            })}
        </p>
        </>
    )
}

export default SingleRegion