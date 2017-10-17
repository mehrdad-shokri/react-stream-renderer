import React from 'react';
// eslint-disable-next-line
import { Text, Endl, colors } from 'react-stream-renderer';

const list = [
  'item1',
  {
    label: 'container1',
    folded: false,
    items: ['item2', 'item3'],
  },
  'item4',
  {
    label: 'container2',
    folded: false,
    items: ['item5', 'item6', 'item7'],
  },
  {
    label: 'container3',
    folded: false,
    items: [
      {
        label: 'container4',
        folded: false,
        items: ['item8', 'item9'],
      },
      {
        label: 'container5',
        folded: false,
        items: ['item10', 'item11'],
      },
    ],
  },
];

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorLine: 0,
    };
    this.currentIndex = 0;
    this.maxIndex = -1;
    this.intervalId = -1;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.cursorLine >= this.maxIndex - 1) {
        clearInterval(this.intervalId);
      }

      this.setState(state => ({ ...state, cursorLine: state.cursorLine + 1 }));
    }, 200);
  }

  _renderItem = (item, nestingCount = 0) => {
    const style =
      this.currentIndex === this.state.cursorLine
        ? {
            backgroundColor: colors.blue,
          }
        : {};
    this.currentIndex++;

    if (typeof item === 'string') {
      return (
        <Text style={style} endl>{`${'  '.repeat(nestingCount)}${item}`}</Text>
      );
    }
    return (
      <Text>
        <Text style={{ color: colors.yellow, ...style }} endl>
          {`${'  '.repeat(nestingCount)}${item.label}`}
        </Text>
        {item.items.map(element => this._renderItem(element, nestingCount + 1))}
      </Text>
    );
  };

  render() {
    this.currentIndex = 0;
    const body = list.map(element => this._renderItem(element));
    this.maxIndex = this.currentIndex;
    return body;
  }
}

export default () => (
  <Text>
    <Text style={{ color: colors.green }}>List viewer</Text>
    <Endl times={2} />
    <Viewer />
  </Text>
);
