import {useState, useEffect} from "react";

const SingleRegion = ({regionName, fuels}) => {

    return (
        <>
        <h3>{regionName}</h3>
        <div>
            {fuels.map((fuel) => {
                return(
                    <div className="data">
                        <p className="fuel">{Object.keys(fuel)[0]}: </p>
                        <p className="perc">{fuel[Object.keys(fuel)[0]]}%</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default SingleRegion