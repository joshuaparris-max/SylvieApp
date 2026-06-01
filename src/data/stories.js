export const stories = [
  {
    id: 'fairy-garden',
    title: 'Sylvie and the Fairy Garden',
    nodes: {
      start: {
        text: 'Sylvie found a tiny gate under the lavender leaves. A shy fairy asked which flower should wake first.',
        choices: [
          { label: 'Wake the sleepy rose', next: 'rose' },
          { label: 'Help the tiny bluebell', next: 'bluebell' },
        ],
      },
      rose: {
        text: 'The rose opened with a warm pink glow and shared its light with the smallest buds.',
        choices: [{ label: 'Share the glow', next: 'end' }],
      },
      bluebell: {
        text: 'The bluebell rang softly. Every garden friend paused to listen and feel calm.',
        choices: [{ label: 'Listen kindly', next: 'end' }],
      },
      end: {
        text: 'The garden remembered Sylvie as a helper with a gentle heart.',
        end: true,
      },
    },
  },
  {
    id: 'little-farm',
    title: "Sylvie's Little Farm",
    nodes: {
      start: {
        text: 'Morning arrived with golden puddles of light. The seedlings looked thirsty, and the hen had lost her ribbon.',
        choices: [
          { label: 'Water the seedlings', next: 'seedlings' },
          { label: 'Find the ribbon', next: 'ribbon' },
        ],
      },
      seedlings: {
        text: 'The seedlings stood tall, and one tiny carrot wiggled happily in the soil.',
        choices: [{ label: 'Fill the harvest basket', next: 'end' }],
      },
      ribbon: {
        text: 'The ribbon was wrapped around the fence post. The hen tucked it safely in her nest.',
        choices: [{ label: 'Pat the hen gently', next: 'end' }],
      },
      end: {
        text: 'The farm felt peaceful because Sylvie noticed what needed care.',
        end: true,
      },
    },
  },
  {
    id: 'ice-princess',
    title: 'The Brave Ice Princess',
    nodes: {
      start: {
        text: 'A crystal bridge glittered over a quiet frozen stream. It looked slippery, but the lantern waited across the way.',
        choices: [
          { label: 'Take slow careful steps', next: 'careful' },
          { label: 'Ask the snowbird for help', next: 'snowbird' },
        ],
      },
      careful: {
        text: 'Each careful step made the bridge hum a brave little tune.',
        choices: [{ label: 'Carry the lantern home', next: 'end' }],
      },
      snowbird: {
        text: 'The snowbird showed a safe path of powdery footprints.',
        choices: [{ label: 'Thank the snowbird', next: 'end' }],
      },
      end: {
        text: 'Bravery was not rushing. It was choosing the next good step.',
        end: true,
      },
    },
  },
  {
    id: 'kind-mermaid',
    title: 'The Kind Mermaid',
    nodes: {
      start: {
        text: 'A little shell choir had lost its song under a silver wave.',
        choices: [
          { label: 'Search the coral nook', next: 'coral' },
          { label: 'Ask the moonfish', next: 'moonfish' },
        ],
      },
      coral: {
        text: 'The song was hiding in a bubble, waiting for someone patient.',
        choices: [{ label: 'Set the song free', next: 'end' }],
      },
      moonfish: {
        text: 'The moonfish glowed a path to the quietest part of the reef.',
        choices: [{ label: 'Swim softly', next: 'end' }],
      },
      end: {
        text: 'The reef sang because kindness made everyone feel safe.',
        end: true,
      },
    },
  },
  {
    id: 'helpful-truck',
    title: 'The Helpful Sorting Truck',
    nodes: {
      start: {
        text: 'A friendly truck rolled up to three tidy bins and beeped a happy hello.',
        choices: [
          { label: 'Sort the shiny bottle', next: 'bottle' },
          { label: 'Sort the apple core', next: 'apple' },
        ],
      },
      bottle: {
        text: 'The bottle clinked into recycling, ready to become something new.',
        choices: [{ label: 'Wave to the truck', next: 'end' }],
      },
      apple: {
        text: 'The apple core joined the compost and dreamed of feeding flowers.',
        choices: [{ label: 'Grow the flowers', next: 'end' }],
      },
      end: {
        text: "The truck drove away proud of Sylvie's careful sorting.",
        end: true,
      },
    },
  },
  {
    id: 'magic-shoes',
    title: 'The Magic Shoes',
    nodes: {
      start: {
        text: 'A pair of tiny shoes sparkled by the dressing mirror. They could dance or tiptoe.',
        choices: [
          { label: 'Dance a happy circle', next: 'dance' },
          { label: 'Tiptoe to the library', next: 'library' },
        ],
      },
      dance: {
        text: 'The dance made the curtains sway like friendly waves.',
        choices: [{ label: 'Bow politely', next: 'end' }],
      },
      library: {
        text: 'The shoes tiptoed to a book that wanted to be read aloud.',
        choices: [{ label: 'Read softly', next: 'end' }],
      },
      end: {
        text: 'The shoes sparkled most when Sylvie chose joy with care.',
        end: true,
      },
    },
  },
  {
    id: 'kind-wand',
    title: 'The Wand That Sparkled When She Was Kind',
    nodes: {
      start: {
        text: 'The wand did not sparkle for loud wishes. It waited for a kind one.',
        choices: [
          { label: 'Wish for a friend to feel better', next: 'friend' },
          { label: 'Wish for flowers to share', next: 'flowers' },
        ],
      },
      friend: {
        text: 'A warm sparkle floated to the friend like a tiny blanket.',
        choices: [{ label: 'Smile gently', next: 'end' }],
      },
      flowers: {
        text: 'The garden grew enough flowers for every windowsill.',
        choices: [{ label: 'Share them', next: 'end' }],
      },
      end: {
        text: 'The wand knew the strongest magic was kindness.',
        end: true,
      },
    },
  },
]
