import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { AxiosResponse } from "axios";

import http from "../../utils/http";
import { errorToastMessage } from "../../utils/toast";

const DocumentHeader = ({ dotLottie, setShowLoader, animRef }: any) => {
  const navigate = useNavigate();

  const handleStartButton = async () => {
    try {
      setShowLoader(true);
      if (dotLottie) {
        dotLottie.play();
      }
      const res: AxiosResponse = await http.post("/documents/create");
      const data = res.data?.data;

      const waitForAnimation = new Promise((resolve) => {
        const checkAnimation = setInterval(() => {
          if (animRef.current) {
            clearInterval(checkAnimation);
            resolve(true);
          }
        }, 100);
      });

      await waitForAnimation;
      setShowLoader(false);
      if (dotLottie) {
        dotLottie.stop();
      }
      navigate(`/document/${data?.id}`);
    } catch (error) {
      errorToastMessage(error as Error);
      setShowLoader(false);
      if (dotLottie) {
        dotLottie.stop();
      }
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography variant="h2">All documents</Typography>
      <Box sx={{ ml: "auto" }}>
        <Button
          onClick={handleStartButton}
          startIcon={<Add />}
          variant="contained"
          color="secondary"
        >
          Start a blank document
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentHeader;
