import { Chip, type ChipProps } from "@mui/material";
import { type VFC } from "react";

import { Speciality } from "../../schema.generated";

type SpecialityChipProps = ChipProps & {
  speciality: Speciality;
};

/**
 * Do not mix data with labels. Map enum values to labels.
 * Useful for app localization.
 */
const specialityLabels = {
  [Speciality.Electrical]: "Electrical",
  [Speciality.Excavation]: "Excavation",
  [Speciality.Geology]: "Geology",
  [Speciality.Geophysics]: "Geophysics",
  [Speciality.GeoScience]: "Geo Science",
  [Speciality.HydroGeology]: "Hydro Geology",
  [Speciality.Metallurgy]: "Metallurgy",
  [Speciality.Mining]: "Mining",
  [Speciality.Plumbing]: "Plumbing",
  [Speciality.Surveying]: "Surveying",
  [Speciality.Transportation]: "Transportation",
  [Speciality.WasteManagement]: "Waste Management",
  [Speciality.Water]: "Water",
};

const SpecialityChip: VFC<SpecialityChipProps> = (props) => {
  const { speciality } = props;

  return <Chip label={specialityLabels[speciality]} {...props} />;
};

export default SpecialityChip;
