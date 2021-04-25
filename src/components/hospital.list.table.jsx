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
      <div className="list-header grid grid-cols-8 md:grid-cols-6 lg:grid-cols-6 gap-3 mb-3 sticky top-0 bg-white pb-3 pt-3">
      <p className="col-span-auto hidden md:inline-flex lg:inline-flex md:col-span-2 lg:col-span-2"></p>
        <p className="cursor-pointer col-span-2 md:col-auto lg:col-auto" onClick={()=>setSortTypeSelected("nonOxygenV")}>
          {`Without Oxygen ${sortTypeSelected==="nonOxygenV" ? "▼": ""}`}
        </p>
        <p className="cursor-pointer col-span-2 md:col-auto lg:col-auto" onClick={()=>setSortTypeSelected("oxygenV")}>
          {`With Oxygen ${sortTypeSelected==="oxygenV" ? "▼" :""}`}
        </p>
        <p className="cursor-pointer col-span-2 md:col-auto lg:col-auto" onClick={()=>setSortTypeSelected("icuV")}>
          {`ICU ${sortTypeSelected==="icuV" ? "▼": ""}`}
        </p>
        <p className="cursor-pointer col-span-2 md:col-auto lg:col-auto" onClick={()=>setSortTypeSelected("ventilatorV")}>
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
    <div className="list-content grid grid-cols-6 gap-3 hover:bg-gray-200 p-0 pt-3 pb-3 md:p-3 lg:p-3  cursor-pointer" onClick={
      () => toggleAdditionalInfo(!showAdditionalInfo)
    }>
      <p className="col-span-8 md:col-span-2 lg:md:col-span-2 text-green-700 text-lg">{hospitalInfo["Institution "]}</p>
      <p className="col-span-2 md:col-auto lg:col-auto" > 
        <Chip type={nonOxygenBedChipType}>{hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]}</Chip> /
        {hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"]}
      </p>
      <p className="col-span-2 md:col-auto lg:col-auto" >
        <Chip type={oxygenBedChipType}>{hospitalInfo["OXYGEN BEDS Vacant"]}</Chip> /
        {hospitalInfo["OXYGEN SUPPORTED BEDS Total"]}
      </p>
      <p className="col-span-2 md:col-auto lg:col-auto" >
        <Chip type={icuBedChipType}>{hospitalInfo["ICU BEDS Vacant"]}</Chip> /
        {hospitalInfo["ICU BEDS Total"]}
      </p>
      <p className="col-span-2 md:col-auto lg:col-auto" >
        <Chip type={vendilatorChipType}>{hospitalInfo["VENTILATOR Vacant"]}</Chip> /
        {hospitalInfo["VENTILATOR Total"]}
      </p>
      {
        showAdditionalInfo &&
        <ul className="col-span-8 text-sm pt-2">
          <li className="flex mb-3 text-gray-600 lg:flota-right md:float-right" >
            <span className="mr-2" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Updated {hospitalInfo["Hours since update "]} hours ago
          </li>
          <a href={`tel:${hospitalInfo["Contact numbers "]}`} >
            <li className="flex mb-3 fit-content" >
                <span className="mr-2" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                {hospitalInfo["Contact numbers "]}
            </li>
          </a>
          <li className="flex mb-5 w-full md:w-full lg:w-3/5" > 
            <span className="mr-2" >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </span>
            {hospitalInfo["Address "]}
          </li>
          {
            hospitalInfo["Google map link "] &&
            <li className="mb-3" >
              <a target="_blank" href={hospitalInfo["Google map link "]}>
                <Button type={ButtonType.Primary} >
                  Get Directions
                  <span className="ml-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </Button>
              </a>
            </li>
          }
        </ul>
      }
    </div>
  )
}