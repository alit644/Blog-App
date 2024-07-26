import { Alert, AlertIcon } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const Alertt = ({  mess  }) => {
  return (
    <Alert status={`error`}>
      <AlertIcon />
      {mess}
    </Alert>
  );
};

export default Alertt;
