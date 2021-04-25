import PropTypes from "prop-types";

const HospitalInfoType = {
  S: PropTypes.exact({
    "NO ": PropTypes.string,
  }),
  "District ": PropTypes.string,
  "Institution ": PropTypes.string,
  "Capacity ": PropTypes.string,
  "Bed Vacancy ": PropTypes.string,
  "Data recency ": PropTypes.string,
  "Remarks ": PropTypes.string,
  "VENTILATOR Total": PropTypes.string,
  "VENTILATOR Occupied": PropTypes.string,
  "VENTILATOR Vacant": PropTypes.string,
  "ICU BEDS Total": PropTypes.string,
  "ICU BEDS Occupied": PropTypes.string,
  "ICU BEDS Vacant": PropTypes.string,
  "OXYGEN SUPPORTED BEDS Total": PropTypes.string,
  "OXYGEN SUPPORTED BEDS Occupied": PropTypes.string,
  "OXYGEN BEDS Vacant": PropTypes.string,
  "NON-OXYGEN SUPPORTED BEDS Total": PropTypes.string,
  "NON-OXYGEN SUPPORTED BEDS Occupied": PropTypes.string,
  "NON-OXYGEN SUPPORTED BEDS Vacant": PropTypes.string,
  "COVID BEDS Total": PropTypes.string,
  "COVID BEDS Occupied": PropTypes.string,
  "COVID BEDS Vacant": PropTypes.string,
  "Contact numbers ": PropTypes.string,
  "Google map link ": PropTypes.string,
  "Website ": PropTypes.string,
  "Address ": PropTypes.string,
  field27: PropTypes.string,
  "Last updated ": PropTypes.string,
  "Hours since update ": PropTypes.string,
};

export default HospitalInfoType;
