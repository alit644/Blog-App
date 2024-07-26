/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { baseUrl } from "../../../Api";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function MyModal({ onClose, isOpen, cateId }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const queryClient = useQueryClient();

  //! form validation with zod
  const editCategorySchema = z.object({
    title: z.string().min(1, { message: "First name is required" }),
  });
  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
    resolver: zodResolver(editCategorySchema),
  });

  const handelEdit = async (dialogData) => {
    const res = await axios.put(`${baseUrl}/categories/${cateId}`, dialogData);
    return res.data;
  };

  const { mutate , isPending } = useMutation({
    mutationFn: handelEdit,
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      onClose();
    },
  });

  // تفريغ الحقل من المحتوى
  useEffect(() => {
    if (isOpen) {
      reset({ title: "" });
    }
  }, [isOpen, reset]);

  // submit form
  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel> Category Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                {...register("title")}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {/* onClick={handleSave} */}
            <Button isLoading={isPending} loadingText="Saving..." onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
