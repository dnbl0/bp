import { ChangeEventHandler } from 'react'
import { Maybe } from '../../types/contentful-cms-types'

export const FormSelector = ({
    optionList,
    defaultValue = '',
    onChange,
}: {
    optionList: (Maybe<string> | undefined)[] | undefined
    defaultValue?: string
    onChange?: ChangeEventHandler<HTMLSelectElement>
}) => {
    if (optionList) {
        return (
            <select
                onChange={onChange ? onChange : () => {}}
                className="pricing-select p-3.5 pr-11 block border-cyan outline-current rounded border text-cyan"
                defaultValue={defaultValue}
            >
                {optionList!.map((value, index) => (
                    <option key={index} value={value!}>
                        {value}
                    </option>
                ))}
            </select>
        )
    } else return <></>
}
