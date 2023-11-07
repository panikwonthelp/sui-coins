import { Box, Motion } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { wrapperVariants } from '@/constants';
import { ClosedSVG } from '@/svg';

import { ConnectWallet } from '../..';
import Avatar from '../avatar';
import { MenuOptionsProps } from './menu-options.types';
import OptionItem from './option-item';

const MenuOptions: FC<MenuOptionsProps> = ({
  avatarUrlRecord,
  suiNSRecord,
  isMenuOpen,
}) => {
  const { asPath, push } = useRouter();
  const { disconnect } = useWalletKit();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Motion
      right={['1rem', '1rem', '1rem', '0']}
      top={['4rem', '4rem', '4rem', '5rem']}
      zIndex={4}
      initial="open"
      borderRadius="1rem"
      position={'absolute'}
      bg="white"
      variants={wrapperVariants}
      animate={isMenuOpen ? 'open' : 'closed'}
      pointerEvents={isMenuOpen ? 'auto' : 'none'}
      textTransform="capitalize"
      border="1px solid"
      borderColor="#C6C6CA"
      width="14.5rem"
      boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
    >
      {avatarUrlRecord && suiNSRecord && (
        <OptionItem>
          <Avatar
            avatarUrlRecord={avatarUrlRecord}
            suiNSRecord={suiNSRecord}
            withNameOrAddress
          />
        </OptionItem>
      )}
      <OptionItem
        selected={asPath == '/'}
        onClick={() => asPath !== '/' && push('/')}
      >
        Create Coin
      </OptionItem>
      <OptionItem
        selected={asPath == '/my-coins'}
        onClick={() => asPath !== '/my-coins' && push('/my-coins')}
      >
        My Coins
      </OptionItem>
      {avatarUrlRecord && suiNSRecord ? (
        <OptionItem onClick={handleDisconnect}>
          <Box display="flex" color="error">
            <ClosedSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          </Box>
          <Box color="error">Sign Out</Box>
        </OptionItem>
      ) : (
        <OptionItem>
          <Box width="100%">
            <ConnectWallet />
          </Box>
        </OptionItem>
      )}
    </Motion>
  );
};

export default MenuOptions;
