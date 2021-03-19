import alignCenter from "./EditorIcons/baseline_format_align_center_white_18dp.png";
import alignJustify from "./EditorIcons/baseline_format_align_justify_white_18dp.png";
import alignLeft from "./EditorIcons/baseline_format_align_left_white_18dp.png";
import alignRight from "./EditorIcons/baseline_format_align_right_white_18dp.png";
import bold from "./EditorIcons/baseline_format_bold_white_18dp.png";
import indentDecrease from "./EditorIcons/baseline_format_indent_decrease_white_18dp.png";
import indentIncrease from "./EditorIcons/baseline_format_indent_increase_white_18dp.png";
import italic from "./EditorIcons/baseline_format_italic_white_18dp.png";
import listBulleted from "./EditorIcons/baseline_format_list_bulleted_white_18dp.png";
import listNumbered from "./EditorIcons/baseline_format_list_numbered_white_18dp.png";
import underlined from "./EditorIcons/baseline_format_underlined_white_18dp.png";
import emoticon from "./EditorIcons/baseline_insert_emoticon_white_18dp.png";
import insertLink from "./EditorIcons/baseline_insert_link_white_18dp.png";
import instertPhoto from "./EditorIcons/baseline_insert_photo_white_18dp.png";
import modeWhite from "./EditorIcons/baseline_mode_white_18dp.png";
import strikethrough from "./EditorIcons/baseline_strikethrough_s_white_18dp.png";
import subscript from "./EditorIcons/baseline_subscript_white_18dp.png";
import superscript from "./EditorIcons/baseline_superscript_white_18dp.png";

export const EditorConfig = {
  inline: {
    bold: {
      icon: bold,
      className: "demo-option-custom",
    },
    italic: {
      icon: italic,
      className: "demo-option-custom",
    },
    underline: {
      icon: underlined,
      className: "demo-option-custom",
    },
    strikethrough: {
      icon: strikethrough,
      className: "demo-option-custom",
    },
    monospace: { className: "demo-option-custom" },
    superscript: {
      icon: superscript,
      className: "demo-option-custom",
    },
    subscript: {
      icon: subscript,
      className: "demo-option-custom",
    },
  },
  blockType: {
    className: "demo-option-custom-wide",
    dropdownClassName: "demo-dropdown-custom",
  },
  fontSize: { className: "demo-option-none" },
  list: {
    unordered: {
      icon: listBulleted,
      className: "demo-option-custom",
    },
    ordered: {
      icon: listNumbered,
      className: "demo-option-custom",
    },
    indent: {
      icon: indentIncrease,
      className: "demo-option-custom",
    },
    outdent: {
      icon: indentDecrease,
      className: "demo-option-custom",
    },
  },
  textAlign: {
    left: {
      icon: alignLeft,
      className: "demo-option-custom",
    },
    center: {
      icon: alignCenter,
      className: "demo-option-custom",
    },
    right: {
      icon: alignRight,
      className: "demo-option-custom",
    },
    justify: {
      icon: alignJustify,
      className: "demo-option-custom",
    },
  },
  fontFamily: {
    className: "demo-option-none",
    dropdownClassName: "demo-dropdown-none",
  },
  colorPicker: {
    icon: modeWhite,
    className: "demo-option-custom",
    popupClassName: "demo-popup-custom",
  },
  link: {
    popupClassName: "demo-popup-custom",
    link: {
      icon: insertLink,
      className: "demo-option-custom",
    },
    unlink: {
      // icon: Icons.unlink,
      className: "demo-option-custom",
    },
  },
  emoji: {
    icon: emoticon,
    className: "demo-option-custom",
    popupClassName: "demo-popup-custom",
  },
  embedded: {
    className: "demo-option-custom",
    popupClassName: "demo-popup-custom",
  },
  image: {
    icon: instertPhoto,
    className: "demo-option-custom",
    popupClassName: "demo-popup-custom",
  },
  remove: {
    // icon: Icons.eraser,
    className: "demo-option-custom",
  },
  history: {
    undo: {
      // icon: Icons.undo,
      className: "demo-option-custom",
    },
    redo: {
      // icon: Icons.redo,
      className: "demo-option-custom",
    },
  },
};
