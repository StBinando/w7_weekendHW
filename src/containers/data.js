import {useState, useEffect} from "react";
import RegionList from "../components/regionsList";
import SelectCountry from "../components/selectCountry";

function Data() {

    const [jdata, setJdata] = useState('');
    let [selectedRegion, setSelectedRegion] = useState("GB");



    useEffect(()=>{
        fetchData();
    }, []);


// ************************************************
// ***************** API REQUEST ******************
// ************************************************
    const fetchData =() => {
        fetch("https://api.carbonintensity.org.uk/regional/intensity/2021-12-03T00:00Z/pt24h")
        // 2021-12-03T00:00Z
        .then( (response) => response.json())
        .then( (jjson) => {
        setJdata(jjson);
        })
    }
    
    
    // **************************************************************
    // *************** LOGIC TO REARRANGE JSON FILE *****************
    // **************************************************************
    
    if (jdata){
        
        
// *********** function to retrieve selection *********************
    const changeSelection = ((region) =>{
        setSelectedRegion(region);
        });
        
// ***** creates array of indexes to loop trough regions *******
        const indexes = Array.from(Array(4).keys());

// *************** IF WE WANT ONLY THE 4 NATIONS ***************
        const regionsNames = ["GB", "England", "Scotland", "Wales"];

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
    let avgFuel = parseFloat(fuel24h/singleRegion.length).toFixed(2);
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
// console.log(dataByRegion)
        

let xxx = dataByRegion.filter((region) => {
    // console.log("Object.keys(region): ", Object.keys(region)[0])
    // console.log("selectedRegion: ", selectedRegion)
    return Object.keys(region)[0] === selectedRegion;
})
console.log("selectedRegion: ", selectedRegion)
console.log("xxx: ", xxx)




// ***********************************************************************
// ******************** JSX to create DOMS *******************************
// ***********************************************************************        
    return (
        <>
        <h1>Electricity production GB on: 03/12/2021</h1>
        {/* <h1>Carbon Intensity data for past 24h for GB regions</h1> */}

        <div class="select">
            <h4>select country</h4>
            <SelectCountry onSelectChange={(regionName) => changeSelection(regionName)}/>
        </div>



        <RegionList regionPassedToDisplay = {dataByRegion.filter((region) => {
            return Object.keys(region)[0] === selectedRegion;
        })}/>
    </>
    );

    } else{ // *********** wait for API to be downloaded *****************
        return(
            <div>
            <h1>Electricity production GB on: 03/12/2021</h1>
        {/* <h1>Carbon Intensity data for past 24h for GB regions</h1> */}
            <h1>loading...</h1>
            </div>
        )}
    }

export default Data;
