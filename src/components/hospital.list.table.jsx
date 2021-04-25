import { useMemo, useState } from "react";

import { Button, ButtonType } from "./button.jsx";
import { Chip, ChipType } from "./chip.jsx";
import { Card } from "./card.jsx";

import { getChipType } from "../util/get.chip.type.js";


const sortTypes = {
  oxygenV:"OXYGEN BEDS Vacant",
  nonOxygenV:"NON-OXYGEN SUPPORTED BEDS Vacant",
  icuV:"ICU BEDS Vacant",
  ventilatorV: "VENTILATOR Vacant"
}

export function HospitalListTable({
  hospitalList = []
}) {

  const [sortTypeSelected, setSortTypeSelected] =useState("oxygenV")
  let sortedHospitalList = useMemo(() => {
    return hospitalList.sort((a,b)=>b[sortTypes[sortTypeSelected]]-a[sortTypes[sortTypeSelected]]);
  }, [sortTypeSelected, hospitalList]);

  return (
    <Card className="hospitalList my-2">
      <div className="list-header grid grid-cols-6 gap-3 mb-3">
        <p className="col-span-2 cursor-pointer"></p>
        <p className="cursor-pointer" onClick={()=>setSortTypeSelected("nonOxygenV")}>
          {`Without Oxygen ${sortTypeSelected==="nonOxygenV" ? "▼": ""}`}
        </p>
        <p className="cursor-pointer" onClick={()=>setSortTypeSelected("oxygenV")}>
          {`With Oxygen ${sortTypeSelected==="oxygenV" ? "▼" :""}`}
        </p>
        <p className="cursor-pointer" onClick={()=>setSortTypeSelected("icuV")}>
          {`ICU ${sortTypeSelected==="icuV" ? "▼": ""}`}
        </p>
        <p className="cursor-pointer" onClick={()=>setSortTypeSelected("ventilatorV")}>
          {`ICU With Ventilator ${sortTypeSelected==="ventilatorV" ? "▼":""}`}
        </p>
      </div>
      {
        sortedHospitalList.map((hospitalInfo, index) => {
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
  let [ showAdditionalInfo, toggleAdditionalInfo ] = useState(false);
  let [oxygenBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["OXYGEN BEDS Vacant"]) / parseInt(hospitalInfo["OXYGEN SUPPORTED BEDS Total"]) * 100;
    return ChipType[getChipType(percentile)];
  });
  let [nonOxygenBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]) / parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"]) * 100;
    return ChipType[getChipType(percentile)]
  });
  let [icuBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["ICU BEDS Vacant"]) / parseInt(hospitalInfo["ICU BEDS Total"]) * 100;
    return ChipType[getChipType(percentile)]
  });
  let [vendilatorChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["VENTILATOR Vacant"]) / parseInt(hospitalInfo["VENTILATOR Total"]) * 100;
    return ChipType[getChipType(percentile)]
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