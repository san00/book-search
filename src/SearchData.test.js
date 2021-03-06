import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import { findByTestAttr } from '../tests/testUtils'
import SearchData from './components/SearchData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Setup function for SearchData component
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = 'null') => {
    return shallow(<SearchData {...props} />)
}

test('SearchData renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-searchData')
    expect(component.length).toBe(1)
})

describe('Capture events entered into form', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('State updates with the value of search box on change', () => {
        const mockOnChange = jest.fn()
        const mockHandleSubmit = jest.fn()

        const wrapper = setup({ handleChange: mockOnChange, handleSubmit: mockHandleSubmit })
        const searchInput = findByTestAttr(wrapper, 'component-searchData-input')

        const mockEvent = { target: { value: 'cars' } }
        searchInput.simulate('change', mockEvent)

        expect(mockOnChange).toHaveBeenCalledWith(mockEvent)
    })

    it('Submits the form to the API', () => {
        const mockHandleSubmit = jest.fn()
        const mockOnChange = jest.fn()

        const wrapper = setup({ handleSubmit: mockHandleSubmit, handleChange: mockOnChange })
        const submitForm = findByTestAttr(wrapper, 'form-submit')

        const mockSubmit = { target: { value: 'books' } }
        submitForm.simulate('submit', mockSubmit)

        expect(mockHandleSubmit).toHaveBeenCalledWith(mockSubmit)
    })
})

