import { TELERIVET_KEY, TELERIVET_PROJECT_ID_KEY } from '../environments';

const telerivet = require('telerivet');

const tr = new telerivet.API('kZzJS_8FwOKOtYAeveaZ3jkzwkMWDkALYlIf');

export const telerivetApp = tr.initProjectById('PJ8eceb59ad4dd00aa');
