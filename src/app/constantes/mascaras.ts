import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';
export const MASK_NUMEROS_ENTEROS = {
  mask: createNumberMask({
    prefix: '',
    thousands: '',
    decimal: '',
    align: 'right',
    suffix: '',
    integerLimit: 6,
    decimalLimit: 0,
    allowDecimal: false,
    includeThousandsSeparator: false
  })
};
