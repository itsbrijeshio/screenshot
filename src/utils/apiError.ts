class ApiError extends Error {
  public status: number;
  public code: number;

  constructor(options: any) {
    super(options.message);
    this.status = options.status;
    this.code = options.code;
    
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
