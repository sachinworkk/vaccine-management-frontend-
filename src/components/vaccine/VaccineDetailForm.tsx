import {
  Modal,
  Button,
  Divider,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Box,
  Heading,
  VStack,
  Input,
  Textarea,
  Checkbox,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { vaccineDetailForm } from "../../types/props";

function VaccineDetailForm(props: vaccineDetailForm) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Vaccine Detail Report</ModalHeader>
          <Divider colorScheme="dark" />

          <ModalBody>
            <VStack align="stretch" gap="4">
              <Flex flexDirection="column" gap="2">
                <Heading as="h2" bg="gray" size="sm" p="2">
                  Name
                </Heading>
                <Input value={props.vaccine.name || ""} isReadOnly />
              </Flex>
              <Flex flexDirection="column" gap="2">
                <Heading as="h2" bg="gray" size="sm" p="2">
                  Number Of Doses
                </Heading>
                <Input
                  type="number"
                  value={props.vaccine.numberOfDoses || ""}
                  isReadOnly
                />
              </Flex>
              <Flex flexDirection="column" gap="2">
                <Heading as="h2" bg="gray" size="sm" p="2">
                  Is Mandatory
                </Heading>
                <Box marginLeft={4}>
                  <Checkbox isChecked={props.vaccine?.isMandatory}></Checkbox>
                </Box>
              </Flex>
              <Flex flexDirection="column" gap="2">
                <Heading as="h2" bg="gray" size="sm" p="2">
                  Stage
                </Heading>
                <Input value={props.vaccine.stage || ""} isReadOnly />
              </Flex>

              <Flex flexDirection="column" gap="2">
                <Heading as="h2" bg="gray" size="sm" p="2">
                  Vaccine Image
                </Heading>
                <Image
                  boxSize="50"
                  src={props.vaccine?.vaccineImageUrl || ""}
                  alt="Vaccine Image"
                  fallbackSrc="https://via.placeholder.com/400?text=Image+Not+Available"
                />
              </Flex>

              <Flex flexDirection="column" gap="2">
                <Heading as="h2" bg="gray" size="sm" p="2">
                  Description
                </Heading>

                <Textarea
                  rows={6}
                  placeholder="Please enter description"
                  value={props?.vaccine.description || ""}
                  isReadOnly
                />
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={props.onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default VaccineDetailForm;
