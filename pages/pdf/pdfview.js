import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const InvoicePDF = dynamic(() => import("./pdf"), {
  ssr: false,
});

const View = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div scale={22222222222222222222220}>
      <InvoicePDF scale={22222222222222222222220}/>
    </div>
  );
};

export default View;
