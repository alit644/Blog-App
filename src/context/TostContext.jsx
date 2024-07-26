/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import Alertt from "../components/shared/Alert/Alert";

export const TostContext = createContext({});

const TostProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [massge, setMassge] = useState("");
  const [status, setStatus] = useState("");

  const showAlertt = (mss , sts) => {
    setOpen(true);
    setMassge(mss);
    setStatus(sts)
    setTimeout(() => {
      setOpen(false);
    }, 2500);
  };
  return (
    <TostContext.Provider value={{ showAlertt }}>
    {  open && <Alertt mess={massge} open={open} status={status}/>}
      {children}
    </TostContext.Provider>
  );
};

export default TostProvider;
