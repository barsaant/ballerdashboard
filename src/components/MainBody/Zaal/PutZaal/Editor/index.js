import imageIcon from "./EditorIcons/image.png";

export const ImageEditor = {
  inline: {
    bold: { className: "demo-option-none" },
    italic: {
      className: "demo-option-none",
    },
    underline: {
      className: "demo-option-none",
    },
    strikethrough: {
      className: "demo-option-none",
    },
    monospace: { className: "demo-option-none" },
    superscript: {
      className: "demo-option-none",
    },
    subscript: {
      className: "demo-option-none",
    },
  },
  blockType: {
    className: "demo-option-none",
    dropdownClassName: "demo-dropdown-custom",
  },
  fontSize: { className: "demo-option-none" },
  list: {
    unordered: {
      className: "demo-option-none",
    },
    ordered: {
      className: "demo-option-none",
    },
    indent: {
      className: "demo-option-none",
    },
    outdent: {
      className: "demo-option-none",
    },
  },
  textAlign: {
    left: { className: "demo-option-none" },
    center: {
      className: "demo-option-none",
    },
    right: {
      className: "demo-option-none",
    },
    justify: {
      className: "demo-option-none",
    },
  },
  fontFamily: {
    className: "demo-option-none",
    dropdownClassName: "demo-dropdown-custom",
  },
  colorPicker: {
    className: "demo-option-none",
    popupClassName: "demo-popup-custom",
  },
  link: {
    popupClassName: "demo-popup-custom",
    link: { className: "demo-option-none" },
    unlink: {
      className: "demo-option-none",
    },
  },
  emoji: {
    className: "demo-option-none",
    popupClassName: "demo-popup-custom",
  },
  embedded: {
    className: "demo-option-none",
    popupClassName: "demo-popup-custom",
  },
  image: {
    icon: imageIcon,
    className: "demo-option-customImage",
    popupClassName: "demo-popup-image",
    alt: { present: true, mandatory: true },
  },
  remove: {
    className: "demo-option-none",
  },
  history: {
    undo: { className: "demo-option-none" },
    redo: { className: "demo-option-none" },
  },
};
