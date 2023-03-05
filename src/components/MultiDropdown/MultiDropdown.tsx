import React from "react";

import cn from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
  element?: any;
  classnames?: string | string[];
  stylestitle?: string | string[];
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
  element,
  classnames,
  stylestitle,
}: MultiDropdownProps) => {
  const plu = React.useMemo(() => pluralizeOptions(value), [value]);
  const title = element;
  const [opened, setOpened] = React.useState(false);
  const toggle = React.useCallback(
    () => !disabled && setOpened(!opened),
    [opened, disabled]
  );
  const close = React.useCallback(() => setOpened(false), []);
  const optionsMap = React.useMemo(
    () =>
      options.reduce<Record<string, Option>>(
        (result, item) => ({
          ...result,
          [item.key]: item,
        }),
        {}
      ),
    [options]
  );
  const selectedOptionsMap = React.useMemo<Record<string, boolean>>(
    () =>
      value.reduce<Record<string, boolean>>(
        (result, option) => ({
          ...result,
          [option.key]: true,
        }),
        {}
      ),
    [value]
  );

  const onSelect = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const selectedKey = (event.target as HTMLDivElement).dataset.key;

      if (!selectedKey || disabled) {
        return;
      }

      const { [selectedKey]: isSelectedBefore, ...other } = selectedOptionsMap;

      const newSelectedOptionsMap = {
        ...other,
        ...(isSelectedBefore ? {} : { [selectedKey]: true }),
      };

      const newValue = Object.keys(newSelectedOptionsMap).map(
        (key) => optionsMap[key]
      );
      onChange(newValue);
    },
    [onChange, optionsMap, selectedOptionsMap]
  );

  const isOpened = opened && !disabled;

  return (
    <div
      className={`${cn(
        "multi-dropdown",
        styles["multi-dropdown"],
        disabled && styles["multi-dropdown_disabled"]
      )} ${classnames}`}
      onBlur={close}
    >
      <div
        className={`${styles["multi-dropdown__control"]} ${stylestitle}`}
        onClick={toggle}
      >
        {title}
      </div>
      {isOpened && (
        <div className={styles["multi-dropdown__options"]}>
          {options.map(({ key, value }) => (
            <div
              className={cn(
                styles["multi-dropdown__item"],
                selectedOptionsMap[key] &&
                  styles["multi-dropdown__item_selected"]
              )}
              data-key={key}
              key={key}
              onClick={(q) => {
                onSelect(q);
                toggle();
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
