import { Controlled as CodeMirror } from 'react-codemirror2';
import { useEffect, useState } from 'react';

import { Page, Fab, Icon, App, f7 } from 'framework7-react';

function Editor({ f7route, f7router }) {
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

  const processJson = () => {
    f7router.navigate('/process/', {
      props: {
        content: state.editor,
      },
    });
  };

  window.electron.ipcRenderer.on('file:save', () => {
    saveFile();
  });

  window.electron.ipcRenderer.on('file:loaded', (content: any) => {
    setState({ editor: content });
  });

  return (
    <Page>
      <CodeMirror
        onBeforeChange={(editor, data, value) => setState({ editor: value })}
        value={state.editor}
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
      <Fab
        position="left-bottom"
        slot="fixed"
        color="blue"
        onClick={() => processJson()}
      >
        <Icon f7="gear_alt_fill" />
      </Fab>
    </Page>
  );
}

export default Editor;
