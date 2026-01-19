import { useState } from 'react';
import clsx from 'clsx';
import style from './Checkbox.module.css';

interface Props extends React.InputHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  initialValue?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({
  children,
  initialValue = false,
  onCheckedChange,
  ...props
}: Props) {
  const [checked, setChecked] = useState<boolean>(initialValue);
  const { className, ...rest } = props;

  return (
    <label className={clsx(style.checkbox, className)} {...rest}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          onCheckedChange(e.target.checked);
        }}
        hidden
        disabled={props.disabled}
      />
      {children}
    </label>
  );
}
