import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsLargeThan<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isLargeThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | number | Date, args: ValidationArguments) {
          return value > args.object[args.constraints[0]];
        },

        defaultMessage(args: ValidationArguments) {
          const [constraintProperty]: (() => any)[] = args.constraints;
          return `${args.property} must be large than ${constraintProperty}`;
        },
      },
    });
  };
}

export function IsArrayEqualLength<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsArrayEqualLength',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: Array<any>, args: ValidationArguments) {
          return value.length === args.object[args.constraints[0]]?.length;
        },

        defaultMessage(args: ValidationArguments) {
          const [constraintProperty]: (() => any)[] = args.constraints;
          return `${args.property} must be equal with length of ${constraintProperty}`;
        },
      },
    });
  };
}
