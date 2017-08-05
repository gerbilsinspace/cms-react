import { isEmpty } from 'validator';

export const required = val => (!isEmpty(val));

export const passwordsMatch = ({ password, passwordConfirm }) => (password === passwordConfirm);

