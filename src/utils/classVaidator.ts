import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserRepository } from '../users/user.repository';

export function IsLongerThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value.length > relatedValue.length
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}

export function IsPassword() {
  const validationOptions: ValidationOptions = {
    message: 'Password is too weak',
  };
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
          );
        },
      },
    });
  };
}

// @ValidatorConstraint({ async: true })
// export class IsUserAlreadyExistConstraint
//   implements ValidatorConstraintInterface {
//   validate(userName: any, args: ValidationArguments) {
//     return UserRepository.findOneByName(userName).then(user => {
//       if (user) return false;
//       return true;
//     });
//   }
// }

// export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
//   return function(object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsUserAlreadyExistConstraint,
//     });
//   };
// }
