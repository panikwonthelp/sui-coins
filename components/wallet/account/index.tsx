import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { MenuSVG } from '@/svg';

import { AccountProps } from './account.types';
import Avatar from './avatar';
import MenuOptions from './menu-options';
import SuiAmount from './sui-amount';

const BOX_ID = 'Account-1';

const Account: FC<AccountProps> = ({ avatarUrlRecord, suiNSRecord }) => {
  const { query } = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(Boolean(query.menu));

  const handleOpenMenu = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('menu', 'true');
    window.history.pushState('', '', url.toString());
    setIsOpenMenu(true);
  };

  const handleCloseAccount = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('menu');
    window.history.pushState('', '', url.toString());
    setIsOpenMenu(false);
  };

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    handleCloseAccount();
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box
      id={BOX_ID}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={connectedBoxRef}
    >
      <Box display="flex" gap="l" cursor="pointer">
        <SuiAmount />
        <Box
          display={['none', 'flex']}
          fontFamily="Proto !important"
          gap="m"
          alignItems="center"
          nHover={{
            bg: 'accent',
            transform: 'scale(1.05)',
          }}
          transition="all 0.3s ease-in-out"
          onClick={handleOpenMenu}
        >
          <Avatar
            avatarUrlRecord={avatarUrlRecord}
            suiNSRecord={suiNSRecord}
            withNameOrAddress
          />
        </Box>
        <Box
          p="0.25rem"
          display={['flex', 'none']}
          border="0.25rem solid"
          borderColor="rgba(0, 83, 219, 0.16)"
          borderRadius="full"
          gap="1rem"
          alignItems="center"
          onClick={handleOpenMenu}
        >
          <Avatar avatarUrlRecord={avatarUrlRecord} suiNSRecord={suiNSRecord} />
          <Box width={['1rem', '1rem', '1rem', '1.5rem']} display="flex">
            <MenuSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          </Box>
        </Box>
      </Box>
      <MenuOptions
        avatarUrlRecord={avatarUrlRecord}
        suiNSRecord={suiNSRecord}
        isMenuOpen={isOpenMenu}
      />
    </Box>
  );
};

export default Account;
