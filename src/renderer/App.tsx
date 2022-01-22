import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import './App.css';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { useEffect, useState } from 'react';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const Hello = () => {
  return (
    <div>
      <h3>Codeeditor</h3>
    </div>
  );
};

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
    (async () => {
      const content: any = await window.electron.ipcRenderer.loadContent;
      setState({ editor: content });
    })();
  }, []);

  const updateScratchpad = (editor, data, value) => {
    window.electron.ipcRenderer.saveContent(value);
    setState({ editor: value });
  };

  const openFile = async () => {
    window.electron.ipcRenderer.openFile();
  };

  window.electron.ipcRenderer.on('file:loaded', (content: any) => {
    setState({ editor: content });
  });

  return (
    <>
      <CodeMirror
        value={state.editor}
        onChange={updateScratchpad}
        options={options}
      />
      <button type="button" onClick={() => openFile()}>
        Abrir archivo
      </button>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScratchPad />} />
      </Routes>
    </Router>
  );
}
