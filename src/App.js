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
  const [filterCache, setFilterCache] = useState([]);
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
    if (
      (filterState.withoutOxygen ||
        filterState.oxygen ||
        filterState.icu ||
        filterState.icuWithVentilator) &&
      !searchText
    ) {
      setFilteredHospitalList(filterCache);
      return;
    } else if (!searchText) {
      setFilteredHospitalList(hospitalList[selectedDist]);
      return;
    }

    const filtered = filteredHospitalList.filter((hospital) => {
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
    if (
      filterState.withoutOxygen ||
      filterState.oxygen ||
      filterState.icu ||
      filterState.icuWithVentilator
    ) {
      setFilteredHospitalList(filterCache);
      setSearchText("");
    } else {
      setFilteredHospitalList(hospitalList[selectedDist]);
      setSearchText("");
    }
  };

  //filter state

  const defaultFilterState = {
    oxygen: false,
    withoutOxygen: false,
    icu: false,
    icuWithVentilator: false,
  };
  const [filterState, setFilterState] = useState({
    oxygen: false,
    withoutOxygen: false,
    icu: false,
    icuWithVentilator: false,
  });

  const handleFilter = (filterName) => {
    setFilterState({
      ...defaultFilterState,
      [filterName]: !filterState[filterName],
    });
  };

  const handleIcu = () => {
    handleFilter("icu");
  };

  const handleOxygen = () => {
    handleFilter("oxygen");
  };

  const handleIcuWithVentilator = () => {
    handleFilter("icuWithVentilator");
  };

  const handleWithoutOxygen = () => {
    handleFilter("withoutOxygen");
  };

  const filterBadges = [
    {
      value: "Without Oxygen",
      active: filterState.withoutOxygen,
      handleFilter: handleWithoutOxygen,
    },
    {
      value: "With Oxygen",
      active: filterState.oxygen,
      handleFilter: handleOxygen,
    },
    {
      value: "ICU",
      active: filterState.icu,
      handleFilter: handleIcu,
    },
    {
      value: "ICU With Ventilator",
      active: filterState.icuWithVentilator,
      handleFilter: handleIcuWithVentilator,
    },
  ];

  useEffect(() => {
    if (filterState.oxygen) {
      const oxygenFilteredArr = hospitalList[selectedDist].filter(
        (hospital) => {
          return hospital["OXYGEN BEDS Vacant"] > 0;
        }
      );
      setFilteredHospitalList(oxygenFilteredArr);
      setFilterCache(oxygenFilteredArr);
    } else if (filterState.icu) {
      const icufilteredArr = hospitalList[selectedDist].filter((hospital) => {
        return hospital["ICU BEDS Vacant"] > 0;
      });
      setFilteredHospitalList(icufilteredArr);
      setFilterCache(icufilteredArr);
    } else if (filterState.withoutOxygen) {
      const withoutOxygenFilteredArr = hospitalList[selectedDist].filter(
        (hospital) => {
          return hospital["NON-OXYGEN SUPPORTED BEDS Vacant"] > 0;
        }
      );
      setFilteredHospitalList(withoutOxygenFilteredArr);
      setFilterCache(withoutOxygenFilteredArr);
    } else if (filterState.icuWithVentilator) {
      const icuWithVentilatorFilteredArr = hospitalList[selectedDist].filter(
        (hospital) => {
          return hospital["VENTILATOR Vacant"] > 0;
        }
      );
      setFilteredHospitalList(icuWithVentilatorFilteredArr);
      setFilterCache(icuWithVentilatorFilteredArr);
    } else {
      setFilteredHospitalList(hospitalList[selectedDist]);
    }
  }, [filterState, selectedDist]);

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
            {filterBadges.map((badge) => {
              return (
                <Badge
                  key={badge.value}
                  value={badge.value}
                  active={badge.active}
                  handleFilter={badge.handleFilter}
                ></Badge>
              );
            })}
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
