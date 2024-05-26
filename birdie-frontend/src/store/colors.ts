export const COLORS: string[] = [
  '#376D7F',
  '#72AF99',
  '#9A9DDF',
  '#FFE27D',
  '#DD8B86',
  '#69929F',
  '#95C3B3',
  '#B3B5E7',
  '#FFEDAE',
  '#E5A8A4',
  '#B4C8CF',
  '#D9DAF3',
  '#F2D3D2',
];

export function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
