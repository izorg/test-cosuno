import {
  AppBar,
  type AppBarProps,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { type VFC } from "react";

const Header: VFC<AppBarProps> = (props) => {
  const { children, ...rest } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      color="inherit"
      elevation={trigger ? 2 : 0}
      position="sticky"
      sx={{
        paddingTop: 2,
      }}
      {...rest}
    >
      <Typography align="center" component="h1" variant="h4">
        Cosuno Companies
      </Typography>
      {children}
    </AppBar>
  );
};

export default Header;
