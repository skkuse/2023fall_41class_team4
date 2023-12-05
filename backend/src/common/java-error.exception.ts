import { HttpException, HttpStatus } from '@nestjs/common';

export class JavaError extends Error {
  name: string;

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class CompileErrorException extends JavaError {
  constructor(message) {
    super(message);
  }
}

export class RuntimeErrorException extends JavaError {
  constructor(message) {
    super(message);
  }
}

export class LimitExceededException extends JavaError {
  constructor(target) {
    super(`${target} 제한을 조과하였습니다.`);
  }
}
