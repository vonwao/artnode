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
      `,
      'cast right': `
      /start 7 7
      .p
      `
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
  },
  // head	none, two tone cap backwards, cap forwards, cap backwards, chef, crown, long peak cap forwards, headphones, silly yellow, bandana, mouse ears
  head: {
    none: ``,
    'two tone cap backwards': `
      /start 6 4
      ..www
      rrrrr
      `,
      'cap forwards': `
      /start 6 4
      ppp
      ppppp
      `,
      'cap backwards': `
      /start 6 4
      ..BBB
      BBBBB
      `,
    'bandana': `
      /start 6 4
      ..pppp
      .p
      p
      `,
    'chef': `
      /start 7 2
      wwww
      wwww
      wwww
      wwww
      `,
      'crown': `
      /start 6 4
      G.G.G
      GGGGG
      `,
      'headphones': `
      /start 6 4
      dddd
      d
      dd
      dd
      `,
      'long peak cap': `
      /start 6 4
      .mmm
      mmmmmm
      `,
      'mouse ears': `
      /start 6 4
      aa.aa
      a
      `,
      'silly yellow': `
      /start 6 4
      .yy.
      yyyy
      `,
      'none': `
      /start 6 4
      `,
      '': `
      /start 6 4
      `,
  },
  feet: {
    'rocket boots': `
      /start 6 13
      .b.b.
      `
  }
  // Add other trait categories as needed
};

export default art;
