import {useState, useEffect} from "react";
import RegionList from "../components/regionsList";

function Data() {

    const [jdata, setJdata] = useState('');

    useEffect(()=>{
        fetchData();
    }, []);
// ************************************************
// ***************** API REQUEST ******************
// ************************************************
    const fetchData =() => {
        fetch("https://api.carbonintensity.org.uk/regional/intensity/2021-12-03T00:00Z/pt24h")
        .then( (response) => response.json())
        .then( (jjson) => {
        setJdata(jjson);
        })
    }


// **************************************************************
// *************** LOGIC TO REARRANGE JSON FILE *****************
// **************************************************************

    if (jdata){
        
// ***** creates array of indexes to loop trough regions *******
        const indexes = Array.from(Array(4).keys());

// *************** IF WE WANT ONLY THE 4 NATIONS ***************
        const regionsNames = ["England", "Scotland", "Wales", "GB"];

// ****************** IF WE WANT ALL REGIONS *******************
        // let regionsNames =[];
        // jdata.data[0].regions.forEach((rregion) => {
        //     return regionsNames.push(rregion.shortname);
        // })

// *************** creates array of fuels names ****************
        let fuelsNames = [];
        jdata.data[0].regions[0].generationmix.forEach((ffuel) => {
            return fuelsNames.push(ffuel.fuel);
        })

// ***** FUNCTION to create averages for ALL fuels for ONE region *****
function fuelByRegion(singleRegion, fuelName){
    
    let fuel24h;
    let singlePerc;
    fuel24h = singleRegion.reduce((total, timeEntry)=>{
            singlePerc = timeEntry.filter((sourcesEntry) => {
                return sourcesEntry.fuel === fuelName;
            })
            return total + singlePerc[0].perc;
        },0)
    let avgFuel = fuel24h/singleRegion.length;
    return avgFuel
}

// ******** FUNCTION to extract all fuel entries for ONE REGION *******
function allEntriesByRegion(regionName){

    let singleRegion =[];
    jdata.data.forEach((entry) =>{
        entry.regions.forEach((regionEntry) => {
            if (regionEntry.shortname === regionName){
                singleRegion.push(regionEntry.generationmix)
            }
        })      
    })

    let avgArray =[];
    fuelsNames.forEach((fuelName) =>{
        let fuelAvg = fuelByRegion(singleRegion,fuelName)
        avgArray.push({[fuelName]:fuelAvg})
    })  
    return avgArray;
}

// **************** RESTRUCTURES JSON into dataByRegion ****************
        let dataByRegion = [];
        regionsNames.forEach((nameRegion) => {
            const fuelsAvgs = allEntriesByRegion(nameRegion)
            return dataByRegion.push({[nameRegion]:fuelsAvgs});
        })
        console.log(dataByRegion)
        

// ***********************************************************************
// ******************** JSX to create DOMS *******************************
// ***********************************************************************        
    return (
        <>
        <h1>Carbon Intensity data for past 24h for GB regions</h1>
        <RegionList dataByRegion = {dataByRegion}/>
        {/* <button onClick={fetchData}>Fetch data</button> */}
    </>
    );

    } else{ // *********** wait for API to be downloaded *****************
        return(
            <div>
            <h1>Carbon Intensity data for past 24h for GB regions</h1>
            <h1>loading...</h1>
            </div>
        )}
    }

export default Data;
