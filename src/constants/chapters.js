/**
 * Chapter and exercise data for the tutorial
 */

import { MODES } from "./modes";

export const CHAPTERS = [
  {
    id: 1,
    icon: "◈",
    title: "Introduction",
    sub: "Modes & core concepts",
    theory:
      "Tridactyl makes Firefox modal — like Vim. Each tab is always in exactly one mode, shown in the bottom status bar. Escape always returns you to Normal mode from anywhere.",
    modeCards: [
      {
        name: "Normal",
        key: "Esc",
        color: "#22d3ee",
        description: "Default. Navigate & start other modes.",
      },
      {
        name: "Hint",
        key: "f",
        color: "#f59e0b",
        description: "Label links for keyboard clicking.",
      },
      {
        name: "Visual",
        key: "v",
        color: "#fb923c",
        description: "Select text with Vim movement keys.",
      },
      {
        name: "Command",
        key: ":",
        color: "#a855f7",
        description: "Run ex-commands like :tabopen.",
      },
      {
        name: "Ignore",
        key: "⇧Ins",
        color: "#6b7280",
        description: "Pass all keys through to the page.",
      },
    ],
    exercises: [
      {
        id: "1-1",
        task: "Press Escape to confirm you are in Normal mode",
        hint: "Esc",
        type: "key",
        key: "Escape",
      },
      {
        id: "1-2",
        task: "Press : to enter Command mode",
        hint: ":",
        type: "enterMode",
        target: MODES.COMMAND,
      },
      {
        id: "1-3",
        task: "Press Escape to return to Normal mode",
        hint: "Esc",
        type: "exitMode",
        from: MODES.COMMAND,
      },
    ],
  },
  {
    id: 2,
    icon: "→",
    title: "Normal Mode",
    sub: "Scrolling, navigation & yanking",
    theory:
      "Normal mode is your home base. Scroll with j/k, jump with gg/G, navigate history with H/L. Key sequences like gg are typed one key at a time — no holding required.",
    exercises: [
      {
        id: "2-1",
        task: "Scroll down 3× using j",
        hint: "j j j",
        type: "keycount",
        key: "j",
        count: 3,
      },
      {
        id: "2-2",
        task: "Scroll up 3× using k",
        hint: "k k k",
        type: "keycount",
        key: "k",
        count: 3,
      },
      {
        id: "2-3",
        task: "Jump to page bottom with G",
        hint: "G",
        type: "keypress",
        key: "G",
      },
      {
        id: "2-4",
        task: "Jump to page top with gg",
        hint: "g → g",
        type: "seq",
        keys: ["g", "g"],
      },
      {
        id: "2-5",
        task: "Zoom in with zi",
        hint: "z → i",
        type: "seq",
        keys: ["z", "i"],
      },
      {
        id: "2-6",
        task: "Reset zoom with zz",
        hint: "z → z",
        type: "seq",
        keys: ["z", "z"],
      },
      {
        id: "2-7",
        task: "Copy current URL with yy",
        hint: "y → y",
        type: "seq",
        keys: ["y", "y"],
      },
    ],
  },
  {
    id: 3,
    icon: "⌖",
    title: "Hint Mode",
    sub: "Keyboard-driven link clicking",
    theory:
      "Press f and every link gets a letter label. Type the label (lowercase) to follow it. If only one hint remains it auto-activates. Use F for background tabs, ;y to copy URLs.",
    exercises: [
      {
        id: "3-1",
        task: "Press f to enter Hint mode",
        hint: "f",
        type: "enterMode",
        target: MODES.HINT,
      },
      {
        id: "3-2",
        task: "Type hint label 'a' to follow the first link",
        hint: "a",
        type: "hintSelect",
        label: "A",
      },
      {
        id: "3-3",
        task: "Enter Hint mode with f, then cancel with Escape",
        hint: "f → Esc",
        type: "hintCancel",
      },
      {
        id: "3-4",
        task: "Press ;y to copy a link URL (enters hint mode)",
        hint: "; → y",
        type: "seq",
        keys: [";", "y"],
      },
    ],
  },
  {
    id: 4,
    icon: "▌",
    title: "Visual Mode",
    sub: "Selecting & yanking text",
    theory:
      "Enter Visual mode with v. Extend the selection with h/j/k/l. Press y to yank text to the clipboard, or s to search for it online. Escape deselects and exits.",
    exercises: [
      {
        id: "4-1",
        task: "Press v to enter Visual mode",
        hint: "v",
        type: "enterMode",
        target: MODES.VISUAL,
      },
      {
        id: "4-2",
        task: "Extend the selection downward with j",
        hint: "j",
        type: "inMode",
        key: "j",
        mode: MODES.VISUAL,
      },
      {
        id: "4-3",
        task: "Yank the selected text with y",
        hint: "y",
        type: "inMode",
        key: "y",
        mode: MODES.VISUAL,
      },
      {
        id: "4-4",
        task: "Exit Visual mode with Escape",
        hint: "Esc",
        type: "exitMode",
        from: MODES.VISUAL,
      },
    ],
  },
  {
    id: 5,
    icon: ":",
    title: "Command Mode",
    sub: "Ex-commands & the console",
    theory:
      "Enter with : and type commands. Tab cycles completions, Up/Down searches history. Ctrl+F autocompletes from history. Enter executes, Escape cancels.",
    exercises: [
      {
        id: "5-1",
        task: "Type :help and press Enter",
        hint: ":help ↵",
        type: "cmd",
        cmd: "help",
      },
      {
        id: "5-2",
        task: "Type :tabopen example.com and press Enter",
        hint: ":tabopen example.com ↵",
        type: "cmd",
        cmd: "tabopen example.com",
      },
      {
        id: "5-3",
        task: "Type :bind j scrollline 20 and press Enter",
        hint: ":bind j scrollline 20 ↵",
        type: "cmd",
        cmd: "bind j scrollline 20",
      },
      {
        id: "5-4",
        task: "Type :viewconfig nmaps and press Enter",
        hint: ":viewconfig nmaps ↵",
        type: "cmd",
        cmd: "viewconfig nmaps",
      },
    ],
  },
  {
    id: 6,
    icon: "⚙",
    title: "Settings",
    sub: "Customizing Tridactyl",
    theory:
      "Use :set to change a setting, :get to read it, :unset to reset to defaults. Use :bind to map keys to commands, :unbind to remove mappings. :viewconfig shows all settings.",
    exercises: [
      {
        id: "6-1",
        task: "Type :set theme dark and press Enter",
        hint: ":set theme dark ↵",
        type: "cmd",
        cmd: "set theme dark",
      },
      {
        id: "6-2",
        task: "Type :set hintfiltermode vimperator and press Enter",
        hint: ":set hintfiltermode vimperator ↵",
        type: "cmd",
        cmd: "set hintfiltermode vimperator",
      },
      {
        id: "6-3",
        task: "Type :get searchengine and press Enter",
        hint: ":get searchengine ↵",
        type: "cmd",
        cmd: "get searchengine",
      },
      {
        id: "6-4",
        task: "Type :unbind j and press Enter",
        hint: ":unbind j ↵",
        type: "cmd",
        cmd: "unbind j",
      },
    ],
  },
  {
    id: 7,
    icon: "⬡",
    title: "Containers",
    sub: "Isolated browsing contexts",
    theory:
      "Firefox Containers isolate cookies and sessions. Tridactyl lets you create, open tabs in, and delete containers entirely from the keyboard using ex-commands.",
    exercises: [
      {
        id: "7-1",
        task: "Type :containercreate Work and press Enter",
        hint: ":containercreate Work ↵",
        type: "cmd",
        cmd: "containercreate Work",
      },
      {
        id: "7-2",
        task: "Type :tabopen -c Work https://github.com and Enter",
        hint: ":tabopen -c Work https://github.com ↵",
        type: "cmd",
        cmd: "tabopen -c Work https://github.com",
      },
      {
        id: "7-3",
        task: "Type :containerclose Work and press Enter",
        hint: ":containerclose Work ↵",
        type: "cmd",
        cmd: "containerclose Work",
      },
      {
        id: "7-4",
        task: "Type :containerdelete Work and press Enter",
        hint: ":containerdelete Work ↵",
        type: "cmd",
        cmd: "containerdelete Work",
      },
    ],
  },
  {
    id: 8,
    icon: "⚡",
    title: "Native Messenger",
    sub: "Beyond the sandbox",
    theory:
      "An optional OS binary that unlocks capabilities browsers can't do alone: edit inputs in $EDITOR, run shell commands, restart Firefox, change browser chrome, load disk themes.",
    exercises: [
      {
        id: "8-1",
        task: "Type :native and press Enter",
        hint: ":native ↵",
        type: "cmd",
        cmd: "native",
      },
      {
        id: "8-2",
        task: "Type :nativeinstall and press Enter",
        hint: ":nativeinstall ↵",
        type: "cmd",
        cmd: "nativeinstall",
      },
      {
        id: "8-3",
        task: "Type :editor and press Enter",
        hint: ":editor ↵",
        type: "cmd",
        cmd: "editor",
      },
      {
        id: "8-4",
        task: "Type :restart and press Enter",
        hint: ":restart ↵",
        type: "cmd",
        cmd: "restart",
      },
    ],
  },
];
