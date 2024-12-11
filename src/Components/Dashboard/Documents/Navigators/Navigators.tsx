import React, { useEffect, useState } from "react";
import { useScrollTrigger } from "@mui/material";
import { useAppSelector } from "../../../../Redux/hooks";
import ScrollTop from "./ScrollTop";
import ScrollBottom from "./ScrollBottom";

type Props = {
  targetRef: React.MutableRefObject<any>;
};

const Navigators = ({ targetRef }: Props) => {
  const documents = useAppSelector((state) => state.dashboard.documents);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const trigger = useScrollTrigger({
    target: targetRef ? targetRef?.current : undefined,
    disableHysteresis: true,
    threshold: 200,
  });

  useEffect(() => {
    const checkOverflow = () => {
      if (targetRef.current) {
        const { scrollHeight, clientHeight } = targetRef.current;
        setIsOverflowing(scrollHeight > clientHeight);
      }
    };
    if (documents.length) checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [documents, targetRef]);

  const handleScrollDown = () => {
    if (targetRef.current) {
      targetRef.current?.scrollBy({ top: 201, behavior: "smooth" });
    }
  };

  return (
    <>
      <ScrollTop trigger={trigger} />
      <ScrollBottom
        trigger={trigger}
        isOverflowing={isOverflowing}
        handleScrollDown={handleScrollDown}
      />
    </>
  );
};

export default Navigators;
