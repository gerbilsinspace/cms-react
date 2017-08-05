const displayBlock = {
  display: 'block'
};

const displayNone = {
  display: 'none'
};

const addStyle = ifStatement => (ifStatement ? displayBlock : displayNone);

export default addStyle;
