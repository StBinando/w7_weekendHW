import {useState} from 'react';


const SelectCountry = ({onSelectChange}) => {
    let [reg, setReg] = useState("GB");
    const regionsNames = ["GB", "England", "Scotland", "Wales"];

    const changeSelection = ((e) => {
        setReg(e.target.value);
        onSelectChange(reg)
        console.log(reg)
        console.log(e.target.value)
    });

    onSelectChange(reg)

    // console.log("regions: ", regionssNames[0])
    return(
        <>
        <select onChange={changeSelection}>
            {regionsNames.map(region => {
            return <option key={region} value={region}>{region}</option>
            })}
        </select>
        </>
    )
}

export default SelectCountry;