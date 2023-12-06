// art.js

// eyes	yellow, white, red, green, dark gray, dark red, blue, purple, orange, blue yellow, light gray, green red, lazer
// face	normal, skull, vizor, ninja, mask, bandages, noun glasses
// feet	rocket boots, normal, skateboard, hoverboard
// hands	normal, cast right, cast left, kite

const art = {
  bg: {
    gradient: `
  1
  2
  3
  4
  `,
    // Add other background styles as needed
  },
  dino: {
    main: `
        /start 5 5
        ..s.s..
        .sDDDD.
        ..D.D.D
        .sDDDDD
        ..Dbb..
        DsDDbD.
        .DDbb..
        ..D.D..
`
  },
  eyes: {
    main: `
      /start 7 7
      .o.o.
      `,
  },
  hands: {
    normal: `
      /start 1 1
      .www.bbbrrrr
      `,
  },
  face: {
    normal: `.`,
    skull: `
      /start 7 7
      .BBB.
      `,
    vizor: `
      /start 7 7
      .www.
      `,
    ninja: `
      /start 7 7
      B.B.B.
      `,
    ninja: `
      /start 7 7
      `,
  },
  // head	none, two tone cap backwards, cap forwards, cap backwards, chef, crown, long peak cap forwards, headphones, silly yellow, bandana, mouse ears
  head: {
    none: ``,
    'two tone cap backwards': `
      /start 5 5
      ..www
      rrrrr
      `,
      'cap forwards': `
      /start 5 5
      ..ppp
      rrrrr
      `,
      'cap backwards': `
      /start 5 5
      ..www
      rrrrr
      `,
    vizor: `
      /start 7 7
      .www.
      `,
    ninja: `
      /start 7 7
      B.B.B.
      `,
    ninja: `
      /start 7 7
      `,
  },
  // Add other trait categories as needed
};

export default art;
