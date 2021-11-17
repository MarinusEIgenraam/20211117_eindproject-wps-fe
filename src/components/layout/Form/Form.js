/** Created by ownwindows on 17-11-21 **/
///////////////////////
//// Built-in
import React, {Component} from 'react';

///////////////////////
//// Internal
import './Form.css';
import InputField from "../../shared/ImputField/InputField";
import {Validators} from "../../../validator/Validator";

///////////////////////
//// External

export default class Form extends Component {

    state = {
        userName: '',
        telephone: '',
        email: '',
    };

    handleChange = (key) => (value) => {
        this.setState({[key]: value})
    };

    render() {
        const {userName, telephone, email} = this.state;

        return (
            <>
            <h2>
                Form with reusable componements
            </h2>

                <InputField
                    value={userName}
                    placeholder='Username'
                    type='text'
                    label='Username'
                    validators={[
                        {check: Validators.required, message: 'This field is required'}
                    ]}
                    onChange={this.handleChange('userName')}
                />
                <InputField
                    value={telephone}
                    placeholder='Telephone number'
                    type='number'
                    label='3242342342'
                    validators={[
                        {check: Validators.required, message: 'This field is required'}
                    ]}
                    onChange={this.handleChange('telephone')}
                />
                <InputField
                    value={email}
                    placeholder='your@email.adres'
                    type='email'
                    label='Email adres'
                    validators={[
                        {check: Validators.required, message: 'This field is required'}
                    ]}
                    onChange={this.handleChange('email')}
                />

            </>
        )
    }

};
