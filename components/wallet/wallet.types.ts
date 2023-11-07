import { ReactNode } from 'react';
export interface WalletDropdownProps {
  isOpen: boolean;
  loading: boolean;
  handleClose: () => void;
  suiNSRecord: Record<string, string>;
}

export type WalletDropdownWrapperProps = WalletDropdownProps;

export interface WalletItemProps {
  name?: 'disconnect';
}

export interface ConnectWalletProps {
  connectText?: ReactNode;
  connectedText?: ReactNode;
}

export interface WalletProps {
  openMenu: () => void;
}
