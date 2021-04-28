import React, { useEffect, useState } from "react";
import { Card } from "./components/card.jsx";
import { Heading } from "./components/heading.jsx";
import { Select } from "./components/select.jsx";
import SearchBar from "./components/search-bar.jsx";
import { isMobile } from "./util/is.mobile.js";
import { Badge } from "./components/badge.jsx";

import { HospitalCardList } from "./components/hospital.list.card.jsx";
import { HospitalListTable } from "./components/hospital.list.table.jsx";

function App() {
  let [selectedDist, changeDist] = useState("Chennai");
  let [distList, setDistList] = useState([]);
  let [hospitalList, setHospitalList] = useState([]);
  let [searchText, setSearchText] = useState("");
  let [filteredHospitalList, setFilteredHospitalList] = useState([]);
  useEffect(function getHospitalList() {
    fetch("https://covidchennai.org/data.json", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
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
      });
  }, []);

  // filtered hospital values
  useEffect(() => {
    setFilteredHospitalList(hospitalList[selectedDist]);
  }, [distList, hospitalList]);

  // Checks onselect district and set hospital values
  useEffect(() => {
    setFilteredHospitalList(hospitalList[selectedDist]);
  }, [selectedDist]);

  const onSelect = (value) => {
    changeDist(value);
  };

  const filterHospital = (searchText) => {
    if (!searchText) {
      setFilteredHospitalList(hospitalList[selectedDist]);
      return;
    }
    const filtered = hospitalList[selectedDist].filter((hospital) => {
      return (
        hospital["Institution "]
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        hospital["Address "].toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredHospitalList(filtered);
  };

  const handleSearch = (input) => {
    filterHospital(input.target.value);
    setSearchText(input.target.value);
  };

  const handleClear = () => {
    setFilteredHospitalList(hospitalList[selectedDist]);
    setSearchText("");
  };

  //filter state

  const [withoutOxygen, setWithoutOxygen] = React.useState(false);
  const [oxygen, setOxygen] = React.useState(false);
  const [icu, setIcu] = React.useState(false);
  const [icuwithventilator, setIcuWithVentilator] = React.useState(false);

  const handleIcu = () => {
    setIcu(!icu);
    setOxygen(false);
    setWithoutOxygen(false);
    setIcuWithVentilator(false);
  };

  const handleOxygen = () => {
    setOxygen(!oxygen);
    setIcu(false);
    setWithoutOxygen(false);
    setIcuWithVentilator(false);
  };

  const handleIcuWithVentilator = () => {
    setIcuWithVentilator(!icuwithventilator);
    setOxygen(false);
    setWithoutOxygen(false);
    setIcu(false);
  };

  const handleWithoutOxygen = () => {
    setWithoutOxygen(!withoutOxygen);
    setOxygen(false);
    setIcu(false);
    setIcuWithVentilator(false);
  };

  useEffect(() => {
    if (oxygen) {
      const oxygenFilteredArr = hospitalList[selectedDist].filter(
        (hospital) => {
          return hospital["OXYGEN BEDS Vacant"] > 0;
        }
      );
      setFilteredHospitalList(oxygenFilteredArr);
    } else if (icu) {
      const icufilteredArr = hospitalList[selectedDist].filter((hospital) => {
        return hospital["ICU BEDS Vacant"] > 0;
      });
      setFilteredHospitalList(icufilteredArr);
    } else if (withoutOxygen) {
      const withoutOxygenFilteredArr = hospitalList[selectedDist].filter(
        (hospital) => {
          return hospital["NON-OXYGEN SUPPORTED BEDS Vacant"] > 0;
        }
      );
      setFilteredHospitalList(withoutOxygenFilteredArr);
    } else if (icuwithventilator) {
      const icuWithVentilatorFilteredArr = hospitalList[selectedDist].filter(
        (hospital) => {
          return hospital["VENTILATOR Vacant"] > 0;
        }
      );
      setFilteredHospitalList(icuWithVentilatorFilteredArr);
    } else {
      setFilteredHospitalList(hospitalList[selectedDist]);
    }
  }, [icu, oxygen, withoutOxygen, icuwithventilator, selectedDist]);

  return (
    <div className="lg:w-7/12 md:w-7/12 bg-white flex flex-col">
      <div className="banner flex gap-x-2 px-4 h-14 items-center border-b-2">
        {/* <div><img src="/logo.svg" alt="logo" className="h-12 w-12"/></div> */}
        <div className="lg:flex-1 md:flex-1">
          <Heading>Chennai covid info</Heading>
          <p>Updated every 30min</p>
        </div>
        {/* <div className="m-l-auto flex gap-x-2">
          <Chip type={ChipType.Info}>xxxxx</Chip>
          <Chip type={ChipType.Info}>xx</Chip>
          <Chip type={ChipType.Info}>xxxxx</Chip>
        </div> */}
      </div>
      <Card className="filter mt-2 gap-x-2 sticky top-4 pb-4 pl-5 pt-4 z-10 bg-green-700 text-white">
        {/* <Button type={ButtonType.Primary}>Beds</Button>
        <Button type={ButtonType.Primary}>Plasma</Button>
        <Button type={ButtonType.Primary}>Hospitals</Button>
        <Button type={ButtonType.Primary}>Emergency contacts</Button> */}
        <p className="text-lg mb-3">
          Covid treating hospitals and beds availability info
        </p>
        <p>
          Filter by district: &nbsp;
          <Select value={selectedDist} options={distList} onSelect={onSelect} />
        </p>
      </Card>

      <Card>
        <SearchBar
          handleSearch={handleSearch}
          handleClear={handleClear}
          searchText={searchText}
        />
        <div className="flex gap-x-2 items-center">
          <span className="mt-2">Available filters: </span>
          <div className="m-l-auto  flex flex-wrap gap-x-2 mt-3">
            <Badge
              value="Without Oxygen"
              active={withoutOxygen}
              handleFilter={handleWithoutOxygen}
            ></Badge>
            <Badge
              value="With Oxygen"
              active={oxygen}
              handleFilter={handleOxygen}
            ></Badge>
            <Badge value="ICU" active={icu} handleFilter={handleIcu}></Badge>
            <Badge
              value="ICU With Ventilator"
              active={icuwithventilator}
              handleFilter={handleIcuWithVentilator}
            ></Badge>
          </div>
        </div>
      </Card>

      {isMobile() ? (
        <HospitalCardList hospitalList={filteredHospitalList} />
      ) : (
        <HospitalListTable hospitalList={filteredHospitalList} />
      )}
    </div>
  );
}

export default App;
