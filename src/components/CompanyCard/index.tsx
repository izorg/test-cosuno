import { Box, Card, CardContent, CardHeader, Stack } from "@mui/material";
import Image from "next/image";
import { forwardRef } from "react";

import type { Company, Speciality } from "../../schema.generated";
import SpecialityChip from "../SpecialityChip";

import logoLoader from "./logoLoader";

type CompanyCardProps = {
  company: Company;
  selectedSpecialities?: Speciality[];
};

const CompanyCard = forwardRef<HTMLDivElement, CompanyCardProps>(
  function CompanyCard(props, ref) {
    const { company, selectedSpecialities = [] } = props;

    return (
      <Card
        key={company.id}
        ref={ref}
        component="section"
        elevation={2}
        sx={{ display: "flex" }}
      >
        <Box sx={{ flexShrink: 0, padding: 2 }}>
          <Box sx={{ width: { xs: 64, md: 128 } }}>
            <Image
              alt="Company logo"
              height={128}
              layout="intrinsic"
              loader={logoLoader}
              src={company.id}
              width={128}
            />
          </Box>
        </Box>
        <Box>
          <CardHeader subheader={company.city} title={company.name} />
          <CardContent>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {company.specialities.map((speciality) => (
                <SpecialityChip
                  key={speciality}
                  color={
                    selectedSpecialities.includes(speciality)
                      ? "primary"
                      : "default"
                  }
                  size="small"
                  speciality={speciality}
                  variant="outlined"
                />
              ))}
            </Stack>
          </CardContent>
        </Box>
      </Card>
    );
  }
);

export default CompanyCard;
