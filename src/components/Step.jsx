import React, { useEffect, useState } from "react";
import { Steps } from "antd";

const Step = ({ stepValue }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(stepValue);
  }, [stepValue]);

  return (
    <>
      <Steps
        current={current}
        direction="vertical"
        items={[
          {
            title: "Step 1",
            description: "Upload a zip file.",
          },
          {
            title: "Step 2",
            description: "Convert to dita format.",
          },
          {
            title: "Step 3",
            description: "Download Output File in Zip format.",
          },
        ]}
      />
    </>
  );
};
export default Step;
