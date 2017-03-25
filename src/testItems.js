export default [
  {
    classNames: [
      {
        name: 'yellow',
        state: null,
        media: null,
      },
      {
        name: 'hover-yellow',
        state: 'hover',
        media: null,
      },
    ],
    css: {
      color: 'gold',
    },
  },
  {
    classNames: [
      {
        name: 'red',
        state: null,
        media: null,
      },
    ],
    css: {
      color: 'crimson',
    },
  },
  {
    classNames: [
      {
        name: 'black',
        state: null,
        media: null,
      },
    ],
    css: {
      color: 'black',
    },
  },
  {
    classNames: [
      {
        name: 'col3',
        state: null,
        media: null,
      },
      {
        name: 'sm-col3',
        state: null,
        media: '(min-width: 40em)',
      },
      {
        name: 'md-col3',
        state: null,
        media: '(min-width: 52em)',
      },
      {
        name: 'lg-col3',
        state: null,
        media: '(min-width: 64em)',
      },
    ],
    css: {
      width: '25%',
    },
  },
  {
    classNames: [
      {
        name: 'flex',
        state: null,
        media: null,
      },
    ],
    css: {
      display: 'flex',
    },
  },
  {
    classNames: [
      {
        name: 'clearfix',
        state: null,
        media: null,
      },
    ],
    invalid: true,
    css: {
      '&:after': {
        content: '""',
        display: 'table',
        clear: 'both',
      },
    },
  },
];
