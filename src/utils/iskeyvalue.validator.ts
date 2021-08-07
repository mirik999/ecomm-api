import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsKeyValueValidate implements ValidatorConstraintInterface {
  async validate(
    columnValue: Record<string, unknown>,
    args: ValidationArguments,
  ) {
    try {
      if (this.isObject(columnValue)) return false;

      let isValidate = true;
      Object.keys(columnValue).forEach(function eachKey(key) {
        if (
          key.length > 20 ||
          typeof key != 'string' ||
          typeof columnValue[key] != 'boolean'
        ) {
          isValidate = false;
        }
      });
      return isValidate;
    } catch (error) {
      console.log(error);
    }
  }

  isObject(objValue) {
    return (
      objValue &&
      typeof objValue === 'object' &&
      objValue.constructor === Object
    );
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    const params = args.constraints[0];
    if (!params.message) return `the ${args.property} is not validate`;
    else return params.message;
  }
}
