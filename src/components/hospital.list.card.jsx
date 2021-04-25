import { useState } from "react";

import { Card } from "./card.jsx";
import { Heading, HeadingSize } from "./heading.jsx";
import { Button, ButtonType } from "./button.jsx";
import { Chip, ChipType } from "./chip.jsx";

import { getChipType } from "../util/get.chip.type.js";

export function HospitalCardList({ hospitalList = [] }) {
  return (
    <div className="my-2 flex-1 overflow-y-auto">
      {
        hospitalList.map((hospitalInfo) => {
          return (
            <HospitalCard
              key={hospitalInfo["Institution "]}
              hospitalInfo={hospitalInfo}
            />
          );
        })
      }
    </div>
  );
}

function HospitalCard({ hospitalInfo }) {
  let [oxygenBedChipType] = useState(() => {
    let percentile =
      (parseInt(hospitalInfo["OXYGEN BEDS Vacant"]) /
        parseInt(hospitalInfo["OXYGEN SUPPORTED BEDS Total"])) *
      100;
    return ChipType[getChipType(percentile)];
  });
  let [nonOxygenBedChipType] = useState(() => {
    let percentile =
      (parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]) /
        parseInt(hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"])) *
      100;
    return ChipType[getChipType(percentile)];
  });
  let [icuBedChipType] = useState(() => {
    let percentile =
      (parseInt(hospitalInfo["OXYGEN BEDS Vacant"]) /
        parseInt(hospitalInfo["ICU BEDS Total"])) *
      100;
    return ChipType[getChipType(percentile)];
  });
  let [vendilatorChipType] = useState(() => {
    let percentile =
      (parseInt(hospitalInfo["VENTILATOR Vacant"]) /
        parseInt(hospitalInfo["VENTILATOR Total"])) *
      100;
    return ChipType[getChipType(percentile)];
  });

  return (
    <Card className="m-3">
      <Heading size={HeadingSize.Sub}>{hospitalInfo["Institution "]}</Heading>
      <Heading size={HeadingSize.Main}>
        <a href={`tel:${hospitalInfo["Contact numbers "]}`}>
          {hospitalInfo["Contact numbers "]}
        </a>
      </Heading>
      <p className="address text-xs md:text-sm mt-1">
        {hospitalInfo["Address "]}
      </p>
      <p className="flex mt-2">
        <a target="_blank" href={hospitalInfo["Google map link "]}>
          <Button type={ButtonType.Primary}>
            Direction
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </Button>
        </a>

        <p className="flex ml-auto items-center" type={ButtonType.Default}>
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          {hospitalInfo["Hours since update "]} hours ago
        </p>
      </p>

      <hr className="mt-2 mb-2" />

      <div className="bed-status flex flex-wrap">
        <div className="withOxygen w-1/2 md:flex-1">
          <p className="text-md mt-1">With Oxygen</p>
          <Chip type={oxygenBedChipType}>
            {hospitalInfo["OXYGEN BEDS Vacant"]}
          </Chip>{" "}
          /{hospitalInfo["OXYGEN SUPPORTED BEDS Total"]}
        </div>
        <div className="withoutOxygen w-1/2 md:flex-1">
          <p className="text-md mt-1">Without Oxygen</p>
          <Chip type={nonOxygenBedChipType}>
            {hospitalInfo["NON-OXYGEN SUPPORTED BEDS Vacant"]}
          </Chip>{" "}
          /{hospitalInfo["NON-OXYGEN SUPPORTED BEDS Total"]}
        </div>
        <div className="ICU w-1/2 md:flex-1">
          <p className="text-md mt-1">ICU</p>
          <Chip type={icuBedChipType}>{hospitalInfo["ICU BEDS Vacant"]}</Chip> /
          {hospitalInfo["ICU BEDS Total"]}
        </div>
        <div className="Ventilators w-1/2 md:flex-1">
          <p className="text-md mt-1">ICU with ventilator</p>
          <Chip type={vendilatorChipType}>
            {hospitalInfo["VENTILATOR Vacant"]}
          </Chip>{" "}
          /{hospitalInfo["VENTILATOR Total"]}
        </div>
      </div>
    </Card>
  );
}
