import _ from 'lodash';

export const vcString = v => (typeof v === 'string' ? v : '');
export const vcStringTo = v =>
  v === undefined || v === null || _.isNaN(v) ? '' : String(v);
export const vcStringTrim = (...arvs) => vcString(...arvs).trim();

export const vcNumber = v => (typeof v === 'number' ? v : +v);
export const vcNumberNaN = (v, d) => (_.isNaN(+v) ? d : +v);

export const vcBoolean = v => !!v;

export const vcArray = v => (_.isArray(v) ? v : []);
export const vcArrayString = v =>
  vcArray(v)
    .map(d => vcStringTrim(d))
    .filter(d => !!d);
export const vcArrayNumber = v =>
  vcArray(v)
    .map(d => vcNumber(d))
    .filter(d => !_.isNaN(d));
export const vcArrayObjectKey = k => v =>
  vcArray(v)
    .map(vcObjectKeyNull(k))
    .filter(d => !!d);

export const vcObject = v => (_.isObject(v) ? v : {});
export const vcObjectNull = v => (_.isObject(v) ? v : null);
export const vcObjectKeyNull = k => v => (_.isObject(v) && v[k] ? v : null);
