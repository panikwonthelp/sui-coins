export interface AccountProps {
  suiNSRecord?: Record<string, string>;
  avatarUrlRecord?: Record<string, string>;
}

export interface AvatarProps extends AccountProps {
  withNameOrAddress?: boolean;
}
