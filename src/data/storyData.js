export const stories = [
  {
    id: 'fairy-garden',
    title: 'Sylvie and the Fairy Garden',
    text: [
      'Sylvie stepped into a gentle fairy garden with glowing flowers.',
      'A tiny fairy whispered, "Would you like to help plant a kindness seed?"',
    ],
    choices: [
      { label: 'Plant the seed', next: 1 },
      { label: 'Watch the sparkles', next: 2 },
    ],
    endings: [
      'The kindness seed grew into a bright blossom, and Sylvie felt proud.',
      'The sparkles danced around her and she knew she was loved.',
    ],
  },
  {
    id: 'little-farm',
    title: 'Sylvie’s Little Farm',
    text: [
      'A cosy farm greeted Sylvie with soft animals and warm sunlight.',
      'The lamb asked, "Would you help me find my hat or water the carrots?"',
    ],
    choices: [
      { label: 'Find the hat', next: 1 },
      { label: 'Water carrots', next: 2 },
    ],
    endings: [
      'The lamb was so happy and Sylvie smiled with gentle joy.',
      'The carrots grew tall and the farm felt bright and calm.',
    ],
  },
  {
    id: 'brave-ice-princess',
    title: 'The Brave Ice Princess',
    text: [
      'A friendly ice princess offered Sylvie a sparkling snowflake.',
      'She asked, "Shall we share it with a friend or keep it for a warm story?"',
    ],
    choices: [
      { label: 'Share with a friend', next: 1 },
      { label: 'Tell a story', next: 2 },
    ],
    endings: [
      'Sharing the snowflake made the day feel magical for everyone.',
      'The story warmed the room and made hearts glow.',
    ],
  },
  {
    id: 'kind-mermaid',
    title: 'The Kind Mermaid',
    text: [
      'Sylvie met a kind mermaid near gentle ocean waves.',
      'The mermaid asked, "Shall we collect shells or help a sea friend?"',
    ],
    choices: [
      { label: 'Collect shells', next: 1 },
      { label: 'Help a sea friend', next: 2 },
    ],
    endings: [
      'The shells were pretty and the ocean sparkled with hope.',
      'Helping a friend made the ocean feel even kinder.',
    ],
  },
]
