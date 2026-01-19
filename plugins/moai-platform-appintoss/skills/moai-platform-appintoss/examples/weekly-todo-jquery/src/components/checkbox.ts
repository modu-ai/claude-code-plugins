import '../styles/checkbox.css';

interface CheckboxComponentOptions {
  initialValue?: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  children?: string;
  disabled?: boolean;
}

export class CheckboxComponent {
  private $element: JQuery;
  private $input: JQuery<HTMLInputElement>;
  private onCheckedChange: (checked: boolean) => void;

  constructor({
    initialValue = false,
    onCheckedChange,
    className = '',
    children = '',
    disabled = false,
  }: CheckboxComponentOptions) {
    this.onCheckedChange = onCheckedChange;
    this.$element = $(`
      <label class="checkbox ${className}">
        <input type="checkbox"
          ${initialValue ? 'checked' : ''} 
          ${disabled ? 'disabled' : ''} 
          hidden 
        />
        ${children}
      </label>
    `);

    this.$input = this.$element.find('input');
    this.$input.on('change', () => {
      const isChecked = this.$input.is(':checked');
      this.$element.toggleClass('checked', isChecked);
      this.onCheckedChange(isChecked);
    });
  }

  public setChecked(value: boolean) {
    this.$input.prop('checked', value).trigger('change');
  }

  public render(): JQuery {
    return this.$element;
  }
}
