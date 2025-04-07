import React from 'react';
import { SingleValue } from 'react-select';

import { SelectOption, SelectValue } from './components/InputField';
import { companyTypes } from './constants';
import { CompanyType } from './types';

export function convertISOToDateString(timestamp: string): string {
    const date = new Date(timestamp);
    const doubleDigit = (digit: number) => `0${digit}`.slice(-2);
    return `${date.getFullYear()}-${doubleDigit(
        date.getMonth() + 1
    )}-${doubleDigit(date.getDate())}`;
}

export function convertDateStringToISO(date: string): string {
    return new Date(date).toISOString().split('.')[0] + 'Z';
}

export function dateView(date: string): string {
    return new Date(date).toLocaleDateString('ru-Ru');
}

export function checkEmail(str: string): boolean {
    return /\S+@\S+\.\S+/.test(str);
}

export function phoneView(phone: string): string {
    const matchedPhone = phone.match(/(\d?)(\d{0,3})(\d{3})(\d{2})(\d{2})/);
    if (!matchedPhone) return phone;
    const [
        ,
        countryCode,
        operatorCode,
        firstDigits,
        secondDigits,
        thirdDigits
    ] = matchedPhone;

    return `${
        countryCode && countryCode !== '8' ? '+' + countryCode : countryCode
    } ${
        operatorCode ? `(${operatorCode})` : ``
    } ${firstDigits}-${secondDigits}-${thirdDigits}`;
}

export function emailView(email: string): React.ReactNode | string {
    return checkEmail(email) ? <a href={'mailto:' + email}>{email}</a> : email;
}

export function convertToSelectOptions(values: CompanyType[]): SelectOption[] {
    return values.map(value => ({
        value,
        label: companyTypes[value]
    }));
}

export function companyTypeView(value: SelectValue): string {
    return Array.isArray(value)
        ? value.map(({ label }) => label).join(', ')
        : (value as SingleValue<SelectOption>)?.label ?? '';
}
