import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Fab, Fade } from "@mui/material";
import React from "react";

type Props = {
  trigger: boolean;
  isOverflowing: boolean;
  handleScrollDown: () => void;
};

const ScrollBottom = ({ trigger, isOverflowing, handleScrollDown }: Props) => {
  return (
    <Fade in={!trigger && isOverflowing}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 20,
          right: "50%",
          transform: "translateX(50%)",
        }}
        onClick={handleScrollDown}
      >
        <Fab
          size="small"
          aria-label="scroll to bottom"
          className="pulse"
          sx={{
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
          }}
        >
          <KeyboardArrowDown />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollBottom;
