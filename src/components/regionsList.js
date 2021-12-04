import {useState, useEffect} from "react";
import SingleRegion from "./singleRegion";

const RegionList = ({regionPassedToDisplay}) => {

    return (
        <div>
            {regionPassedToDisplay.map((region) =>{

                return(
                    <div class="country">
                    <SingleRegion
                        regionName = {Object.keys(region)}
                        fuels = {region[Object.keys(region)]}
                    />
                    </div>
                )
            })}

        </div>

    )
}

export default RegionList