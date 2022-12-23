import { useEffect, useState } from "react";

import {
  Text,
  Box,
  Flex,
  Modal,
  Input,
  Image,
  Button,
  VStack,
  Divider,
  Heading,
  Textarea,
  Checkbox,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

import { vaccineDetailForm } from "../../types/props";

import { IMAGE_LIGHTBOX } from "../../constants/constants";

function VaccineDetailForm(props: vaccineDetailForm) {
  const [isImageLightBoxOpen, setIsOpenImageLightBox] = useState(false);

  const [key, setKey] = useState(0);

  useEffect(() => {
    setTimeout(() => setKey(key + 1));
  }, [isImageLightBoxOpen]);

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

                <Flex flexDirection="column">
                  <Image
                    boxSize="50"
                    cursor="pointer"
                    onClick={() => setIsOpenImageLightBox(true)}
                    src={props.vaccine?.vaccineImageUrl || ""}
                    alt="Vaccine Image"
                    fallbackSrc="https://via.placeholder.com/400?text=Image+Not+Available"
                  />

                  <Text>Click on the image</Text>
                </Flex>

                {isImageLightBoxOpen && (
                  <Lightbox
                    key={key}
                    mainSrc={props.vaccine?.vaccineImageUrl || ""}
                    onCloseRequest={() => setIsOpenImageLightBox(false)}
                    reactModalStyle={{
                      overlay: {
                        zIndex: IMAGE_LIGHTBOX.Z_INDEX,
                      },
                    }}
                  />
                )}
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
