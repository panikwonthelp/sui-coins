import styled from '@emotion/styled';
import { Box } from '@interest-protocol/ui-kit';
import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { pathOr, prop } from 'ramda';
import { FC, useEffect, useState } from 'react';

import { useNetwork, useWeb3 } from '@/hooks';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { useProvider } from '@/hooks/use-provider';
import { MenuSVG } from '@/svg';
import { noop } from '@/utils';

import Account from './account';
import MenuOptions from './account/menu-options';
import { ConnectWalletProps } from './wallet.types';

const ConnectWalletButton = styled(ConnectButton)`
  background: #0053db !important;
  font-family: Proto !important;
  border-radius: 99rem !important;
  padding: 0.625rem 1.5rem !important;
  font-size: 0.875rem !important;
`;

export const ConnectWallet: FC<ConnectWalletProps> = (props) => (
  <ConnectWalletButton {...props} />
);

const BOX_ID = 'MOBILE-BOX';

const Wallet: FC = () => {
  const { connected, account } = useWeb3();
  const { network } = useNetwork();
  const { suiNSProvider, provider } = useProvider();
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { accounts } = useWalletKit();

  const [suiNSRecord, setSuiNSRecord] = useState<Record<string, string>>({});
  const [avatarUrlRecord, setAvatarUrlRecord] = useState<
    Record<string, string>
  >({});
  console.log(loading);
  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    setOpenMenu(false);
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  useEffect(() => {
    if (accounts.length) {
      setLoading(true);

      const promises = accounts.map((walletAccount) =>
        suiNSProvider.getName(walletAccount.address)
      );

      Promise.all(promises)
        .then(async (names) => {
          setSuiNSRecord(
            names.reduce(
              (acc, name, index) =>
                name ? { ...acc, [accounts[index].address]: name } : acc,
              {} as Record<string, string>
            )
          );
        })
        .catch(noop)
        .finally(() => setLoading(false));
    }
  }, [network, accounts]);

  useEffect(() => {
    if (account && suiNSRecord[account]) {
      suiNSProvider
        .getNameObject(suiNSRecord[account], {
          showAvatar: true,
        })
        .then(async (object) => {
          const nftId = prop('nftId', object);
          if (nftId) {
            const nft = await provider.getObject({
              id: nftId,
              options: { showDisplay: true },
            });

            const imageUrl = pathOr(
              null,
              ['data', 'display', 'data', 'image_url'],
              nft
            ) as string | null;

            if (imageUrl) {
              setAvatarUrlRecord((x) => ({
                ...x,
                [account]: imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/'),
              }));
            }
          }
        })
        .catch();
    }
  }, [account, network, suiNSRecord]);

  return (
    <Box>
      {connected ? (
        <Account avatarUrlRecord={avatarUrlRecord} suiNSRecord={suiNSRecord} />
      ) : (
        <>
          <Box display={['none', 'flex']}>
            <ConnectWallet />
          </Box>
          <Box
            id={BOX_ID}
            p="0.25rem"
            display={['flex', 'none']}
            border="0.25rem solid"
            borderColor="rgba(0, 83, 219, 0.16)"
            borderRadius="full"
            gap="1rem"
            alignItems="center"
            onClick={() => setOpenMenu(true)}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={connectedBoxRef}
          >
            <Box width={['1rem', '1rem', '1rem', '1.5rem']} display="flex">
              <MenuSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
            </Box>
            <MenuOptions isMenuOpen={openMenu} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Wallet;
