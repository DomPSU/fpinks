const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'black',
  'grey',
  'brown',
  'gold',
  'silver',
  'white',
  'none',
];

const nibSizes = [
  'unmarked',
  '< ef',
  'f',
  'm',
  'b',
  'bb',
  '3b',
  'flex',
  '< 0.5mm',
  '0.5mm',
  '0.6mm',
  '0.7mm',
  '0.8mm',
  '0.9mm',
  '1.0mm',
  '1.1mm',
  '1.2mm',
  '1.3mm',
  '1.4mm',
  '1.5mm',
  '> 1.5mm',
];

const nibGrinds = [
  'unknown',
  'regular',
  'stub',
  'italic',
  'calligraphy',
  'architect',
  'left oblique',
  'right oblique',
];

const nibTunes = ['factory', 'custom', 'unknown'];

const paperStyles = ['plain', 'lined', 'grid', 'dot'];

const amounts = ['none', 'light', 'heavy'];

const waterproofnesses = [
  'none',
  'partially legible',
  'fully legible',
  '100% (no smear)',
];

const dryingTimes = [
  '1s',
  '2s',
  '3s',
  '4s',
  '5s',
  '10s',
  '15s',
  '20s',
  '25s',
  '30s',
  '60s',
  '+60s',
];

const transparencies = [
  'no ghosting',
  'light ghosting',
  'heavy ghosting',
  'light bleed-through',
  'heavy bleed-through',
];

module.exports = {
  colors,
  nibSizes,
  nibGrinds,
  nibTunes,
  paperStyles,
  amounts,
  waterproofnesses,
  dryingTimes,
  transparencies,
};
