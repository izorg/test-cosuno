import { TextField, type TextFieldProps } from "@mui/material";
import { type VFC } from "react";

const NameTextField: VFC<TextFieldProps> = (props) => (
  <TextField
    fullWidth
    label="Search"
    margin="normal"
    placeholder="Company name"
    size="small"
    type="search"
    {...props}
  />
);

export default NameTextField;
