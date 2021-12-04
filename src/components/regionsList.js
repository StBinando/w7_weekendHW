import {useState, useEffect} from "react";
import SingleRegion from "./singleRegion";

const RegionList = ({dataByRegion}) => {

    // console.log(Object.keys(dataByRegion[0]))



    return (
        <div>
            region list
            <hr/>
            {dataByRegion.map((region) =>{
                // console.log("regionxxx: ", region)

                return(
                    <>
                    <SingleRegion
                        regionName = {Object.keys(region)}
                        // fuelsNames = {region[Object.keys(region)].map((fuel) => {
                        //     return (
                        //         Object.keys(fuel)[0]
                        //     )
                        // })}
                        // fuelsPerc = {region[Object.keys(region)].map((fuel) => {
                        //     return (
                        //         fuel[Object.keys(fuel)[0]]
                        //     )
                        // })}
                        fuels = {region[Object.keys(region)]}
                    />
                    <hr/>
                    </>
                        )
                    })}

        </div>

    )
}

export default RegionList