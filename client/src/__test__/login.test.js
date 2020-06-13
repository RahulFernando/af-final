import React from 'react'
import {shallow} from 'enzyme'
import Login from '../components/admin/Login'

describe('Login component', () => {
    it('it should render without throwing an error', () => {
        expect(shallow(<Login/>).find('form.login').exists()).toBe(true)
    })
    it('renders email input', () => {
        expect(shallow(<Login/>).find('#username').length).toEqual(1)
    })
    it('renders password input', () => {
        expect(shallow(<Login/>).find('#password').length).toEqual(1)
    })
})

describe('Username input', () => {
    it('should repond to event change', () => {
        const wrapper = shallow(<Login/>);
        wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'admin'}});
        expect(wrapper.state('username')).toEqual('admin')
    })
})
