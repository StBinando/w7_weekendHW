import {useState, useEffect} from "react";
import SingleRegion from "./singleRegion";

const RegionList = ({regionPassedToDisplay}) => {

    return (
        <div>
            {regionPassedToDisplay.map((region, index) =>{

                return(
                    <div className="country">
                    <SingleRegion
                        regionName = {Object.keys(region)}
                        fuels = {region[Object.keys(region)]}
                        key = {index}
                    />
                    </div>
                )
            })}

        </div>

    )
}

export default RegionList