import { Backdrop, Container } from "@mui/material";

import DashboardHeader from "./Header";
import Documents from "./Documents/Documents";
import createDocAnimation from "./createDocAnimation.json";
import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Dashboard = () => {
  const [dotLottie, setDotLottie] = useState<any>(null);
  const [showLoader, setShowLoader] = useState(false);
  const animationCompleteRef = useRef(false);

  const dotLottieRefCallback = (dotLottie: any) => {
    setDotLottie(dotLottie);
  };

  useEffect(() => {
    function loopCount(event: any) {
      const loopCount = event?.loopCount;
      if (loopCount === 1) {
        animationCompleteRef.current = true;
      }
    }

    if (dotLottie) {
      dotLottie.addEventListener("loop", loopCount);
    }
    return () => {
      if (dotLottie) {
        dotLottie.removeEventListener("loop", loopCount);
      }
    };
  }, [dotLottie]);

  return (
    <Container sx={{ height: "100%" }}>
      <Backdrop
        open={showLoader}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <DotLottieReact
          data={createDocAnimation}
          loop
          dotLottieRefCallback={dotLottieRefCallback}
          layout={{ fit: "contain", align: [50, 50] }}
        />
      </Backdrop>
      <DashboardHeader
        dotLottie={dotLottie}
        setShowLoader={setShowLoader}
        animRef={animationCompleteRef}
      />
      <Documents />
    </Container>
  );
};

export default Dashboard;
