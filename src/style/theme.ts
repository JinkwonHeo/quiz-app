const colors = {
  black: '#000000',
  white: '#ffffff',
  green: '#3cb46e',
  red: '#ff3c3c',
  gray: '#d0d0d0',
  blue: '#006de9',
};

const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

const deviceSizes = {
  mobile: '500px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
};

const theme = {
  device,
  colors,
  common,
};

export default theme;
