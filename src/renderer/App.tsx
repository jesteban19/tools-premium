import { App, View } from 'framework7-react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import './App.css';
import Editor from './pages/Editor';
import Process from './pages/Process';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const f7params = {
  name: 'My App',
  id: 'com.myapp.test',
  // specify routes for app
  routes: [
    {
      path: '/',
      component: Editor,
    },
    {
      path: '/process/',
      component: Process,
      options: {
        props: {
          content: '',
        },
      },
    },
  ],
};

export default () => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <App {...f7params}>
      <View main url="/" />
    </App>
  );
};
