import React from "react";

import { HazardChemical } from "./selectOptions";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";

const HazardChemicalSelect = ({ onChange, isInvalid }) => {
  return (
    <CustomSelect
      items={HazardChemical}
      label="Are there any chemical hazards?"
      onChange={onChange}
      isInvalid={isInvalid}
      testID="myn-report-hazard-page-chemical-hazard-select"
      formControlProps={{
        paddingBottom: 3,
      }}
    />
  );
};

export default HazardChemicalSelect;