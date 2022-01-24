import { Controlled as CodeMirror } from 'react-codemirror2';
import {
  Block,
  BlockTitle,
  Navbar,
  Page,
  Treeview,
  TreeviewItem,
  Popup,
} from 'framework7-react';
import { useEffect, useState } from 'react';

function Process({ f7router, content }) {
  const [state, setState] = useState({ popupOpen: false, editor: '' });

  const options = {
    theme: 'material',
    lineNumbers: true,
    mode: { name: 'javascript', json: true },
  };

  const searchFrame = (frame: string) => {
    const file = JSON.parse(content);
    return file.frames.filter((f: any) => f.idFrame === frame);
  };

  const showJson = (frame) => {
    setState({
      popupOpen: true,
      editor: JSON.stringify(searchFrame(frame), null, 2),
    });
  };

  const childCardNextFrame: any = (json: any, added: any) => {
    return Object.entries(json).map(([key, value]: any, index) => {
      if (key !== 'head') {
        if (typeof value === 'string') {
          if (key === 'nextFrame') {
            if (added.indexOf(value) === -1) {
              added.push(value);
              return (
                <TreeviewItem label={value}>
                  <span slot="content-end">
                    <button
                      className="button button-fill button-raised button-small"
                      type="button"
                      onClick={() => showJson(value)}
                    >
                      Ver JSON
                    </button>
                  </span>

                  {childCardNextFrame(searchFrame(value), added)}
                </TreeviewItem>
              );
            }
            return (
              <TreeviewItem label={value}>
                <span slot="content-end">
                  <button
                    className="button button-fill button-raised button-small"
                    type="button"
                    onClick={() => showJson(value)}
                  >
                    Ver JSON
                  </button>
                </span>
              </TreeviewItem>
            );
          }
        } else {
          return childCardNextFrame(value, added);
        }
      }
    });
  };

  const childCard = (json: any) => {
    if (json) {
      return json.map((item: any, index: any) => {
        return (
          <TreeviewItem key={index} label={item.idFrame}>
            {childCardNextFrame(item, [])}
          </TreeviewItem>
        );
      });
    }
  };

  const builderCards = () => {
    const file = JSON.parse(content);
    const cards = [];
    return childCard(
      file.frames.filter(
        (f: any) => f.idFrame === 'pagoServicios' || f.idFrame === 'recargas'
      )
    );
  };

  useEffect(() => {
    builderCards();
  });

  return (
    <Page>
      <Navbar title="Json TreeView" backLink="Regresar" />
      <BlockTitle>Visualizador archivo json</BlockTitle>
      <Block strong className="no-padding-horizontal">
        <Treeview>{builderCards()}</Treeview>
      </Block>
      <Popup
        opened={state.popupOpen}
        onPopupClosed={() => setState({ popupOpen: false })}
        className="demo-popup-push popup-tablet-fullscreen"
        push
      >
        <Page>
          <Navbar>
            <button
              type="button"
              className="button"
              onClick={() => setState({ popupOpen: false })}
            >
              Cerrar vista previa
            </button>
          </Navbar>
          <CodeMirror value={state.editor} options={options} />
        </Page>
      </Popup>
    </Page>
  );
}

export default Process;
