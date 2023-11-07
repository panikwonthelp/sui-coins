import { AccountProps } from '../account.types';

export interface OptionItemProps {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface MenuSwitchAccountProps {
  isOpen: boolean;
  loading: boolean;
  onBack: () => void;
  suiNSRecord: Record<string, string>;
  avatarUrlRecord: Record<string, string>;
  handleCloseProfile: () => void;
}

export interface MenuOptionsProps extends AccountProps {
  isMenuOpen: boolean;
}
