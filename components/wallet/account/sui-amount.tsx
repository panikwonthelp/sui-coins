import { COIN_TYPE, Network } from '@interest-protocol/sui-amm-sdk';
import { Box } from '@interest-protocol/ui-kit';
import { pathOr } from 'ramda';
import { FC } from 'react';

import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { LoadingSVG, SuiSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

const SuiAmount: FC = () => {
  const { coinsMap, isFetchingCoinBalances } = useWeb3();

  return (
    <Box
      pl="L"
      pr="M"
      as="span"
      whiteSpace="nowrap"
      fontFamily="Proto !important"
      display={['none', 'flex']}
      alignItems="center"
      gap="m"
    >
      <Box
        ml="S"
        as="span"
        color="white"
        width="1.5rem"
        height="1.5rem"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#6FBCF0"
      >
        <SuiSVG
          height="100%"
          width="100%"
          maxHeight="1rem"
          maxWidth="1rem"
          fill="currentColor"
        />
      </Box>
      {isFetchingCoinBalances ? (
        <Box as="span" display="inline-block">
          <LoadingSVG
            width="100%"
            height="100%"
            maxWidth="1rem"
            maxHeight="1rem"
          />
        </Box>
      ) : (
        FixedPointMath.toNumber(
          pathOr(
            ZERO_BIG_NUMBER,
            [COIN_TYPE[Network.DEVNET].SUI, 'totalBalance'],
            coinsMap
          )
        )
      )}
    </Box>
  );
};

export default SuiAmount;
