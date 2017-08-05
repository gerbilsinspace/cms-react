const displayBlock = {
  display: 'block'
};

const displayNone = {
  display: 'none'
};

export const addStyle = (ifStatement) => {
  return ifStatement ? displayBlock : displayNone;
};
