export interface configType {
  key: string;
  onLoad?: () => void;
  onSuccess: (contractCode: string) => void;
  onClose?: () => void;
}
