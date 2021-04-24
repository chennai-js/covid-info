import { useEffect, useState } from "react";
import { Button, ButtonType } from "./components/button.jsx";
import { Card } from "./components/card.jsx";
import { Chip, ChipType } from "./components/chip.jsx";
import { Heading } from "./components/heading.jsx";
import { Select } from "./components/select.jsx";

function App() {

  let [selectedDist, changeDist] = useState("Chennai");
  let [distList, setDistList] = useState([]);
  let [hospitalList, setHospitalList] = useState([]);
  useEffect(function getHospitalList() {
    fetch("/mock.json", {
      mode: "cors"
    })
    .then(res => res.json())
    .then(data => {
      let hospitalsByDist = data.reduce((acc, hospital) => {
        let dist = hospital["District "];
        let arr = acc[dist] || [];
        arr.push(hospital);
        acc[dist] = arr;
        return acc; 
      }, {});
      let distList = Object.keys(hospitalsByDist);
      setDistList(distList);
      setHospitalList(hospitalsByDist);
    })
  }, []);

  const onSelect = (value) => {
    changeDist(value);
    console.log("selected value", value);
  }

  return (
    <div className="w-7/12 bg-white">
      <div className="banner flex h-5 gap-x-2 px-4 h-14 items-center border-b-2">
        <div><img src="/logo.svg" alt="logo" className="h-12 w-12"/></div>
        <div className="flex-1">
          <Heading>Chennai covid info</Heading>
          <p>Updated every 30min</p>
        </div>
        <div className="m-l-auto flex gap-x-2">
          <Chip type={ChipType.Info}>xxxxx</Chip>
          <Chip type={ChipType.Info}>xx</Chip>
          <Chip type={ChipType.Info}>xxxxx</Chip>
        </div>
      </div>
      <Card className="filter gap-x-2">
        {/* <Button type={ButtonType.Primary}>Beds</Button>
        <Button type={ButtonType.Primary}>Plasma</Button>
        <Button type={ButtonType.Primary}>Hospitals</Button>
        <Button type={ButtonType.Primary}>Emergency contacts</Button> */}
        <p className="text-lg mb-3">
          Covid treating hospitals and beds availability info
        </p>
        <p>
          Filter by district: &nbsp;
          <Select value={selectedDist} options={distList} onSelect={onSelect}/>
        </p>
      </Card>
      <HospitalList hospitalList={hospitalList[selectedDist]}/>
    </div>
  );
}

function HospitalList({
  hospitalList = []
}) {
  const [sortTypeSelected,setSortTypeSelected] =useState("oxygenV")
  const sortTypes = {
    oxygenV:"OXYGEN BEDS Vacant",
    nonOxygenV:"NON-OXYGEN SUPPORTED BEDS Vacant",
    icuV:"ICU BEDS Vacant",
    ventilatorV: "VENTILATOR Vacant"
  }
  const cursorPointerStyle={cursor:"pointer"}

  return (
    <Card className="hospitalList my-2">
      <div className="list-header grid grid-cols-6 gap-3 mb-3">
        <p className="col-span-2"></p>
        <p style={cursorPointerStyle} onClick={()=>setSortTypeSelected("nonOxygenV")}>{`Without Oxygen${sortTypeSelected==="nonOxygenV" ? "▼": ""}`}</p>
        <p style={cursorPointerStyle} onClick={()=>setSortTypeSelected("oxygenV")}>{`With Oxygen${sortTypeSelected==="oxygenV" ? "▼" :""}`}</p>
        <p style={cursorPointerStyle} onClick={()=>setSortTypeSelected("icuV")}>{`ICU${sortTypeSelected==="icuV" ? "▼": ""}`}</p>
        <p style={cursorPointerStyle} onClick={()=>setSortTypeSelected("ventilatorV")}>{`Ventilator${sortTypeSelected==="ventilatorV" ? "▼":""}`}</p>
      </div>
      {
        hospitalList.sort((a,b)=>b[sortTypes[sortTypeSelected]]-a[sortTypes[sortTypeSelected]]).map((hospitalInfo, index) => {
          return (
            <HospitalsInfo key={hospitalInfo["Institution "]} hospitalInfo={hospitalInfo}/>     
          )
        })
      }
    </Card>
  )
}

function HospitalsInfo({
  hospitalInfo
}) {
  let getChipType = (percentile) => {
    percentile = isNaN(percentile) ? 0 : percentile == Infinity ? 0 : percentile;
    console.log("incoming percentile", percentile);
    switch(true) {
      case percentile < 1: 
        return ChipType.Error;
      case percentile <= 25:
        return ChipType.Warn;
      case percentile > 25:
        return ChipType.Info;
      
    }
  }
  let [ showAdditionalInfo, toggleAdditionalInfo ] = useState(false);
  let [oxygenBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["OXYGEN BEDS Vacant"]) / parseInt(hospitalInfo["OXYGEN SUPPORTED BEDS Total"]) * 100;
    return getChipType(percentile);
  });
  let [nonOxygenBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]) / parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"]) * 100;
    return getChipType(percentile);
  });
  let [icuBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["ICU BEDS Vacant"]) / parseInt(hospitalInfo["ICU BEDS Total"]) * 100;
    return getChipType(percentile);
  });
  let [vendilatorChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["VENTILATOR Vacant"]) / parseInt(hospitalInfo["VENTILATOR Total"]) * 100;
    return getChipType(percentile);
  });

  return (
    <div className="list-content grid grid-cols-6 gap-3 hover:bg-gray-200 p-3  cursor-pointer" onClick={
      () => toggleAdditionalInfo(!showAdditionalInfo)
    }>
      <p className="col-span-2 text-green-700 text-lg">{hospitalInfo["Institution "]}</p>
      <p> 
        <Chip type={nonOxygenBedChipType}>{hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]}</Chip> /
        {hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"]}
      </p>
      <p>
        <Chip type={oxygenBedChipType}>{hospitalInfo["OXYGEN BEDS Vacant"]}</Chip> /
        {hospitalInfo["OXYGEN SUPPORTED BEDS Total"]}
      </p>
      <p>
        <Chip type={icuBedChipType}>{hospitalInfo["ICU BEDS Vacant"]}</Chip> /
        {hospitalInfo["ICU BEDS Total"]}
      </p>
      <p>
        <Chip type={vendilatorChipType}>{hospitalInfo["VENTILATOR Vacant"]}</Chip> /
        {hospitalInfo["VENTILATOR Total"]}
      </p>
      {
        showAdditionalInfo &&
        <ul className="col-span-6 text-sm">
          <li>Lastupdated: {hospitalInfo["Hours since update "]} hours ago</li>
          <li>Phone: {hospitalInfo["Contact numbers "]}</li>
          <li>Address: {hospitalInfo["Address "]}</li>
          {
            hospitalInfo["Google map link "] &&
            <li>
              Map: &nbsp;
              <a target="_blank" href={hospitalInfo["Google map link "]}>
                <Button type={ButtonType.Primary}>Direction</Button>
              </a>
            </li>
          }
        </ul>
      }
    </div>
  )
}

export default App;
