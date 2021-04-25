import { useState } from "react";

import  { Card } from "./card.jsx";
import { Heading, HeadingSize } from "./heading.jsx";
import { Button, ButtonType } from "./button.jsx";
import { Chip, ChipType } from "./chip.jsx";

import { getChipType } from "../util/get.chip.type.js";

export function HospitalCardList({ hospitalList = [] }) {
  return hospitalList.map((hospitalInfo) => {
    return <HospitalCard key={hospitalInfo["Institution "]} hospitalInfo={hospitalInfo} />
  });
}

function HospitalCard({ hospitalInfo }) {

  let [oxygenBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["OXYGEN BEDS Vacant"]) / parseInt(hospitalInfo["OXYGEN SUPPORTED BEDS Total"]) * 100;
    return ChipType[getChipType(percentile)];
  });
  let [nonOxygenBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]) / parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"]) * 100;
    return ChipType[getChipType(percentile)]
  });
  let [icuBedChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["OXYGEN BEDS Vacant"]) / parseInt(hospitalInfo["ICU BEDS Total"]) * 100;
    return ChipType[getChipType(percentile)]
  });
  let [vendilatorChipType] = useState(() => {
    let percentile = parseInt(hospitalInfo["VENTILATOR Vacant"]) / parseInt(hospitalInfo["VENTILATOR Total"]) * 100;
    return ChipType[getChipType(percentile)]
  });

  return <Card className="m-3">
      <Heading size={HeadingSize.Sub}>{hospitalInfo["Institution "]}</Heading>
      <Heading size={HeadingSize.Main}>
        <a href={`tel:${hospitalInfo["Contact numbers "]}`}>{hospitalInfo["Contact numbers "]}</a>
      </Heading>
      <p className="address text-xs md:text-sm mt-1">{hospitalInfo["Address "]}</p>
      <p className="flex mt-2">
          <a target="_blank" href={hospitalInfo["Google map link "]}>
            <Button type={ButtonType.Primary}>Direction</Button>
          </a>
          <Button className="ml-auto" type={ButtonType.Default}>{hospitalInfo["Hours since update "]} hours ago</Button>         
      </p>
     
      <hr className="mt-2 mb-2" />

      <div className="bed-status flex flex-wrap">
        <div className="withOxygen w-1/2 md:flex-1">
          <p className="text-sm mt-1">With Oxygen</p>
          <Chip type={oxygenBedChipType}>{hospitalInfo["OXYGEN BEDS Vacant"]}</Chip> /
          {hospitalInfo["OXYGEN SUPPORTED BEDS Total"]}
        </div>
        <div className="withoutOxygen w-1/2 md:flex-1">
          <p className="text-sm mt-1">Without Oxygen</p>
          <Chip type={nonOxygenBedChipType}>{hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]}</Chip> /
          {hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"]}
        </div>
        <div className="ICU w-1/2 md:flex-1">
          <p className="text-sm mt-1">ICU</p>
          <Chip type={icuBedChipType}>{hospitalInfo["ICU BEDS Vacant"]}</Chip> /
          {hospitalInfo["ICU BEDS Total"]}
        </div>
        <div className="Ventilators w-1/2 md:flex-1">
          <p className="text-sm mt-1">ICU with ventilator</p>
          <Chip type={vendilatorChipType}>{hospitalInfo["VENTILATOR Vacant"]}</Chip> /
          {hospitalInfo["VENTILATOR Total"]}
        </div>
      </div>     
  </Card>
}