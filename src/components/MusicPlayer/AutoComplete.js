import * as React from "react";
import Downshift from "downshift";

function AutoComplete(props) {
  const {
    items = [],
    onChange = () => {},
    label = "list",
    initial
  } = props;

  return (
    // @ts-ignore initialInputValue not in types
    <Downshift
      onChange={onChange}
      initialInputValue={initial}
      itemToString={item => (item ? item : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div className="control">
          <label {...getLabelProps()} className="label">
            {label}
          </label>
          <input {...getInputProps()} className="input" />
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(
                    item =>
                      !inputValue ||
                      item.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        //@ts-ignore
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index
                              ? "lightgray"
                              : undefined,
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                      className={"control"}
                    >
                      {item}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}

export default AutoComplete;
