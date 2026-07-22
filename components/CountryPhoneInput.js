import { useMemo, useState } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import labels from "react-phone-number-input/locale/en";

const digitsOnly = (value = "") => String(value).replace(/\D/g, "");

export default function CountryPhoneInput({
  name = "phone",
  value,
  onChange,
  defaultCountry = "CA",
  placeholder = "Enter your Phone",
  className = "",
  inputClassName = "",
  wrapperClassName = "",
  style,
  required = false,
  disabled = false,
  ...inputProps
}) {
  const [country, setCountry] = useState(defaultCountry);
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const internationalDigits = digitsOnly(isControlled ? value : internalValue);
  const callingCode = getCountryCallingCode(country);
  const localValue = internationalDigits.startsWith(callingCode)
    ? internationalDigits.slice(callingCode.length)
    : internationalDigits;
  const countryOptions = useMemo(
    () => getCountries().sort((a, b) => labels[a].localeCompare(labels[b])),
    [],
  );
  const Flag = flags[country];

  const emitValue = (nextCountry, nextLocalValue) => {
    const nextCallingCode = getCountryCallingCode(nextCountry);
    const nextValue = nextLocalValue ? `${nextCallingCode}${digitsOnly(nextLocalValue)}` : "";
    if (!isControlled) setInternalValue(nextValue);
    onChange?.({
      target: { name, value: nextValue },
      currentTarget: { name, value: nextValue },
    });
  };

  const handleCountryChange = (event) => {
    const nextCountry = event.target.value;
    setCountry(nextCountry);
    emitValue(nextCountry, localValue);
  };

  const handlePhoneChange = (event) => {
    emitValue(country, event.target.value);
  };

  return (
    <div className={`country-phone-shell ${wrapperClassName}`.trim()}>
      <div className="country-phone-country">
        {Flag && <Flag title={labels[country]} />}
        <span className="country-phone-chevron" aria-hidden="true" />
        <select
          aria-label="Country calling code"
          value={country}
          onChange={handleCountryChange}
          disabled={disabled}
        >
          {countryOptions.map((countryCode) => (
            <option key={countryCode} value={countryCode}>
              {labels[countryCode]} +{getCountryCallingCode(countryCode)}
            </option>
          ))}
        </select>
      </div>
      <span className="country-phone-code">+{callingCode}</span>
      <input
        {...inputProps}
        type="tel"
        name={`${name}_local`}
        value={localValue}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        inputMode="tel"
        autoComplete="tel-national"
        className={`country-phone-number ${className} ${inputClassName}`.trim()}
        style={style}
      />
      <input type="hidden" name={name} value={internationalDigits ? `+${internationalDigits}` : ""} />
    </div>
  );
}
