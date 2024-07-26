/* eslint-disable react/prop-types */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const Inputt = ({ label, name, type = "text", register, errors }) => {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        {...register(name)}
        isInvalid={errors ? true : false}
      />
      <FormHelperText color={"red.500"}>
        {errors}
      </FormHelperText>
    </FormControl>
  );
};

export default Inputt;
