import isUndefined from 'lodash.isundefined'
import isEmpty from 'lodash.isempty'
import isNull from 'lodash.isnull'
export const isValid = (val) => {
  return !isUndefined(val) && !isEmpty(val) && !isNull(val)
}
