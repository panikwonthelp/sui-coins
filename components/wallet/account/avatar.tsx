import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useWeb3 } from '@/hooks';
import { UserSVG } from '@/svg';

import { getName } from '../wallet.utils';
import { AvatarProps } from './account.types';

const Avatar: FC<AvatarProps> = ({
  avatarUrlRecord,
  suiNSRecord,
  withNameOrAddress,
}) => {
  const { account } = useWeb3();

  if (!(avatarUrlRecord && suiNSRecord)) return null;

  return (
    <>
      <Box
        display="flex"
        width={['1.25rem', '1.25rem', '1.25rem', '1.5rem']}
        height={['1.25rem', '1.25rem', '1.25rem', '1.5rem']}
        cursor="pointer"
        overflow="hidden"
        alignItems="center"
        borderRadius="full"
        background="primary"
        justifyContent="center"
        color="onPrimary"
        transition="background-color .5s"
      >
        {avatarUrlRecord[account || ''] ? (
          <img
            width="100%"
            height="100%"
            src={avatarUrlRecord[account || '']}
            alt={`${getName(account || '', suiNSRecord)} NFT`}
          />
        ) : (
          <Box width={['0.75rem', '0.75rem', '0.75rem', '1rem']}>
            <UserSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Box>
        )}
      </Box>
      {withNameOrAddress && getName(account || '', suiNSRecord)}
    </>
  );
};

export default Avatar;
