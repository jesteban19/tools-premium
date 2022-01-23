import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import './App.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useEffect, useState } from 'react';

import { Page, Fab, Icon, App, f7 } from 'framework7-react';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const ScratchPad = () => {
  const [state, setState] = useState({
    editor: '',
  });

  const options = {
    theme: 'material',
    lineNumbers: true,
    mode: { name: 'javascript', json: true },
  };

  useEffect(() => {
    window.electron.ipcRenderer.loadContent
      .then((content: any) => {
        setState({ editor: content });
        return true;
      })
      .catch((err: any) => {});
  }, []);

  const updateScratchpad = (editor, data, value) => {
    //setState({ editor: value });
  };

  const openFile = async () => {
    window.electron.ipcRenderer.openFile();
  };

  const saveFile = async () => {
    f7.preloader.show();
    window.electron.ipcRenderer.saveContent(state.editor);
    setTimeout(() => {
      f7.preloader.hide();
    }, 100);
  };

  window.electron.ipcRenderer.on('file:save', () => {
    saveFile();
  });

  window.electron.ipcRenderer.on('file:loaded', (content: any) => {
    setState({ editor: content });
  });

  return (
    <App>
      <Page>
        <CodeMirror
          onBeforeChange={(editor, data, value) => setState({ editor: value })}
          value={state.editor}
          onChange={updateScratchpad}
          options={options}
        />
        <Fab
          position="center-bottom"
          slot="fixed"
          color="red"
          onClick={() => openFile()}
        >
          <Icon f7="doc_text" />
        </Fab>
        <Fab
          position="right-bottom"
          slot="fixed"
          color="green"
          onClick={() => saveFile()}
        >
          <Icon f7="floppy_disk" />
        </Fab>
      </Page>
    </App>
  );
};

export default function AppHome() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScratchPad />} />
      </Routes>
    </Router>
  );
}
