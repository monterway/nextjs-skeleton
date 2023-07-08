export interface ModalType {
  title: string;
  description: string|string[];
  hasClose?: boolean;
  primary?: {
    title: string;
    onClick: () => void;
  };
}
