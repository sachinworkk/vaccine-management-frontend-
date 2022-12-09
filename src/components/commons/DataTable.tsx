import { useTheme } from "@table-library/react-table-library/theme";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { dataTable } from "../../types/props";

import {
  getTheme,
  DEFAULT_OPTIONS,
} from "@table-library/react-table-library/chakra-ui";
import { Box, IconButton, Button, HStack } from "@chakra-ui/react";

function DataTable(props: dataTable) {
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const rowData = {
    nodes: props?.items,
  };

  const pagination = usePagination(rowData, {
    state: {
      page: 0,
      size: props?.numberOfItemsPerPage,
    },
  });

  return (
    <>
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable
          pagination={pagination}
          columns={props?.columns}
          data={rowData}
          theme={theme}
        />

        <br />

        <HStack justify="flex-end">
          <IconButton
            aria-label="previous page"
            icon={<FaChevronLeft />}
            colorScheme="teal"
            variant="ghost"
            disabled={pagination.state?.page === 0}
            onClick={() => pagination.fns.onSetPage(pagination.state?.page - 1)}
          />

          {pagination.state
            .getPages(rowData?.nodes)
            ?.map((_: any, index: number) => (
              <Button
                key={index}
                colorScheme="teal"
                variant={pagination.state?.page === index ? "solid" : "ghost"}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </Button>
            ))}
          <IconButton
            aria-label="next page"
            icon={<FaChevronRight />}
            colorScheme="teal"
            variant="ghost"
            disabled={
              pagination.state?.page + 1 ===
              pagination.state.getTotalPages(rowData?.nodes)
            }
            onClick={() => pagination.fns.onSetPage(pagination.state?.page + 1)}
          />
        </HStack>
      </Box>
    </>
  );
}

export default DataTable;
