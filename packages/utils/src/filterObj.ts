import { AssociativeArray } from './array'
import * as R from 'ramda'

export default <T>(pred: (value: any, key?: string, array?: AssociativeArray<any>) => boolean) =>
    <T>(array: AssociativeArray<T>): AssociativeArray<T> =>
        Object
            .keys(array)
            .reduce(
                (r, key) => {
                        const test = pred(array[key])
                        return test
                            ? {...r, [key]: array[key]}
                            : r
                },
                {}
            ) as AssociativeArray<T>
