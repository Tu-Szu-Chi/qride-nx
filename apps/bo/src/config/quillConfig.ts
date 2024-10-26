import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import ReactQuill from 'react-quill';

Quill.register('modules/imageResize', ImageResize);

export const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
  'code-block',
  'alt',
  'height',
  'width',
  'style',
];

export const createQuillModules = (handleImageUpload: () => void) => ({
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
    handlers: {
      image: handleImageUpload,
    },
    clipboard: {
      matchVisual: false,
    },
  },
  imageResize: {
    parchment: ReactQuill.Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
  },
});
