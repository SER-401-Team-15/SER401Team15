import { HazardPropane } from "./selectOptions";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";

const HazardPropaneSelect = ({ onChange, isInvalid }) => {
  return (
    <CustomSelect
      items={HazardPropane}
      label="Are there any propane or gas hazards?"
      onChange={onChange}
      isInvalid={isInvalid}
      testID="myn-report-hazard-page-propane-hazard-select"
      formControlProps={{
        paddingBottom: 3,
      }}
    />
  );
};

export default HazardPropaneSelect;
