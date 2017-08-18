const initialCreateState = {
  name: ''
};

export const login = {
  email: '',
  password: ''
};

export const register = {
  email: '',
  password: '',
  passwordConfirm: ''
};

export const forgottenPassword = {
  email: ''
};

export const resetPassword = {
  password: '',
  passwordConfirm: ''
};

export const addLinkToMenu = {
  url: '',
  text: ''
}

export const createPage = {
  name: '',
  slug: ''
};

export const createMenu = initialCreateState;
export const createTemplate = initialCreateState;
export const createPartial = initialCreateState;

