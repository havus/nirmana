# frozen_string_literal: true

# Error codes for business logic errors
# These are mapped to HTTP status codes in the controller layer
module ErrorCodes
  # Authentication & Authorization
  AUTH_MISSING_CREDENTIALS = 'AUTH_001'
  AUTH_INVALID_CREDENTIALS = 'AUTH_002'
  AUTH_ACCOUNT_DEACTIVATED = 'AUTH_003'
  AUTH_EMAIL_NOT_VERIFIED = 'AUTH_004'
  AUTH_UNAUTHORIZED = 'AUTH_005'
  AUTH_SESSION_EXPIRED = 'AUTH_006'
  AUTH_INVALID_TOKEN = 'AUTH_007'

  # User Management
  USER_NOT_FOUND = 'USER_001'
  USER_ALREADY_EXISTS = 'USER_002'
  USER_UPDATE_FAILED = 'USER_003'
  USER_FORBIDDEN = 'USER_004'

  # Validation
  VALIDATION_ERROR = 'VAL_001'
  VALIDATION_INVALID_FORMAT = 'VAL_002'
  VALIDATION_MISSING_FIELD = 'VAL_003'

  # Password Management
  PASSWORD_RESET_TOKEN_INVALID = 'PWD_001'
  PASSWORD_RESET_TOKEN_EXPIRED = 'PWD_002'
  PASSWORD_RESET_FAILED = 'PWD_003'
  PASSWORD_CHANGE_FAILED = 'PWD_004'
  PASSWORD_CURRENT_INCORRECT = 'PWD_005'

  # Email Verification
  EMAIL_TOKEN_INVALID = 'EMAIL_001'
  EMAIL_TOKEN_EXPIRED = 'EMAIL_002'
  EMAIL_VERIFICATION_FAILED = 'EMAIL_003'
  EMAIL_ALREADY_VERIFIED = 'EMAIL_004'

  # Project Management
  PROJECT_NOT_FOUND = 'PROJ_001'
  PROJECT_CREATE_FAILED = 'PROJ_002'
  PROJECT_UPDATE_FAILED = 'PROJ_003'
  PROJECT_DELETE_FAILED = 'PROJ_004'
  PROJECT_FORBIDDEN = 'PROJ_005'

  # System Errors
  SYSTEM_ERROR = 'SYS_001'
  SYSTEM_SERVICE_UNAVAILABLE = 'SYS_002'
  SYSTEM_NOT_FOUND = 'SYS_003'

  # Map error codes to HTTP status codes
  # Controllers use this to determine the HTTP response status
  HTTP_STATUS_MAP = {
    # 400 Bad Request
    AUTH_MISSING_CREDENTIALS => :bad_request,
    VALIDATION_MISSING_FIELD => :bad_request,
    
    # 401 Unauthorized
    AUTH_INVALID_CREDENTIALS => :unauthorized,
    AUTH_ACCOUNT_DEACTIVATED => :unauthorized,
    AUTH_EMAIL_NOT_VERIFIED => :unauthorized,
    AUTH_UNAUTHORIZED => :unauthorized,
    AUTH_SESSION_EXPIRED => :unauthorized,
    AUTH_INVALID_TOKEN => :unauthorized,
    PASSWORD_CURRENT_INCORRECT => :unauthorized,
    
    # 403 Forbidden
    USER_FORBIDDEN => :forbidden,
    PROJECT_FORBIDDEN => :forbidden,
    
    # 404 Not Found
    USER_NOT_FOUND => :not_found,
    PROJECT_NOT_FOUND => :not_found,
    SYSTEM_NOT_FOUND => :not_found,
    PASSWORD_RESET_TOKEN_INVALID => :not_found,
    EMAIL_TOKEN_INVALID => :not_found,
    
    # 422 Unprocessable Entity
    VALIDATION_ERROR => :unprocessable_entity,
    VALIDATION_INVALID_FORMAT => :unprocessable_entity,
    USER_ALREADY_EXISTS => :unprocessable_entity,
    USER_UPDATE_FAILED => :unprocessable_entity,
    PASSWORD_RESET_TOKEN_EXPIRED => :unprocessable_entity,
    PASSWORD_RESET_FAILED => :unprocessable_entity,
    PASSWORD_CHANGE_FAILED => :unprocessable_entity,
    EMAIL_TOKEN_EXPIRED => :unprocessable_entity,
    EMAIL_VERIFICATION_FAILED => :unprocessable_entity,
    EMAIL_ALREADY_VERIFIED => :unprocessable_entity,
    PROJECT_CREATE_FAILED => :unprocessable_entity,
    PROJECT_UPDATE_FAILED => :unprocessable_entity,
    PROJECT_DELETE_FAILED => :unprocessable_entity,
    
    # 500 Internal Server Error
    SYSTEM_ERROR => :internal_server_error,
    
    # 503 Service Unavailable
    SYSTEM_SERVICE_UNAVAILABLE => :service_unavailable
  }.freeze

  def self.http_status_for(error_code)
    HTTP_STATUS_MAP[error_code] || :internal_server_error
  end
end
