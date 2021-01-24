export const Option = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline']
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code']
  },
  fontSize: {
    icon: 'fontSize',
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]
  },
  list: {
    inDropdown: false,
    options: ['unordered']
  },
  textAlign: {
    inDropdown: false,
    options: ['left', 'center', 'right']
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink']
  },
  image: {
    urlEnabled: true,
    // uploadEnabled: true,
    alignmentEnabled: true,
    previewImage: true,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto'
    }
  },
  history: {
    inDropdown: false,
    options: ['undo', 'redo']
  }
}
