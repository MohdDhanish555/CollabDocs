import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Fade } from "@mui/material";
import React from "react";

type Props = {
  trigger: boolean;
};

const ScrollTop = ({ trigger }: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <Fab
          className="pulse"
          sx={{
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
          }}
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollTop;
