import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import TopPoolsTableBody from './top-pools-table-body';
import TopPoolsTableHead from './top-pools-table-head';

const TopPoolsTable: FC = () => {
  return (
    <Box
      width="100%"
      display="flex"
      overflowX="auto"
      borderRadius="xs"
      overflowY="hidden"
      color="onSurface"
      gridColumn="1/-1"
      flexDirection="column"
      bg="lowestContainer"
    >
      <Box minWidth="55em">
        <TopPoolsTableHead title="Top pools" />
        <TopPoolsTableBody />
      </Box>
    </Box>
  );
};

export default TopPoolsTable;
