interface VisibilityProps {
  visible: boolean;
  children: React.ReactNode;
}

export function Visibility({ visible, children }: VisibilityProps) {
  return visible ? children : null;
}
