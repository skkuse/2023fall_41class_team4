export class JavaError extends Error {
  name: string;

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class CompileError extends JavaError {
  constructor(message) {
    super(message);
  }
}

export class RuntimeError extends JavaError {
  constructor(message) {
    super(message);
  }
}

export class KilledError extends JavaError {
  constructor(cause) {
    super(`${cause} 제한을 초과하여 프로세스가 강제 종료되었습니다.`);
  }
}
