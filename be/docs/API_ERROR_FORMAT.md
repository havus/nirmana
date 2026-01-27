# API Error Response Format

## Overview

This project implements a standardized error response format for API v1 that provides:
- **Error codes**: Internal business-level error codes for programmatic handling
- **Messages**: Human-readable error messages (concatenated when multiple)
- **HTTP status**: Automatically mapped from error codes

## Architecture

### 1. Service Layer (`ServiceResult`)
Services return business-level errors with error codes, not HTTP status codes.

```ruby
# app/services/concerns/service_result.rb
ServiceResult.success(data: {...}, messages: ["Success message"])
ServiceResult.failure(error_code: ErrorCodes::AUTH_INVALID_CREDENTIALS, messages: ["Error message"])
```

### 2. Error Codes (`ErrorCodes`)
Business-level error codes with automatic HTTP status mapping.

```ruby
# app/constants/error_codes.rb
ErrorCodes::AUTH_INVALID_CREDENTIALS  # Maps to :unauthorized (401)
ErrorCodes::USER_NOT_FOUND            # Maps to :not_found (404)
ErrorCodes::VALIDATION_ERROR          # Maps to :unprocessable_entity (422)
```

### 3. Controller Layer (`ApiErrorRenderer`)
Controllers map error codes to HTTP status and format responses.

```ruby
# app/controllers/concerns/api_error_renderer.rb
render_result(result)  # Handles both success and failure
render_error(result)   # Manual error rendering
```

## Response Format

### Success Response
```json
{
  "message": "Operation completed successfully",
  "data": {
    "user": {...}
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "AUTH_002",
    "message": "Invalid credentials."
  }
}
```

## Usage Examples

### Example 1: Simple Service

```ruby
class UserLoginService
  def call
    return ServiceResult.failure(
      error_code: ErrorCodes::AUTH_MISSING_CREDENTIALS,
      messages: ["Login and password are required."]
    ) if @login.blank?

    ServiceResult.success(
      data: { user: user, session: session },
      messages: ["Signed in successfully"]
    )
  end
end
```

### Example 2: Multiple Error Messages (Same Error Code)

```ruby
class UserUpdateService
  def call
    result = ServiceResult.failure(
      error_code: ErrorCodes::VALIDATION_ERROR,
      messages: []
    )
    
    result.add_message("Username is invalid") if username_invalid?
    result.add_message("Email format is incorrect") if email_invalid?
    
    return result if result.messages.any?
    
    # Continue with update...
  end
end
```

**Response:**
```json
{
  "error": {
    "code": "VAL_001",
    "message": "Username is invalid Email format is incorrect"
  }
}
```

### Example 3: Controller Usage

```ruby
class Api::V1::AuthController < ApplicationController
  def sign_in
    result = UserLoginService.call(...)
    
    # Simple: Auto-handle success/error
    render_result(result)
    
    # Or with custom success rendering:
    render_result(result, success_status: :ok) do |success_result|
      render json: {
        message: success_result.message,
        user: format_user(success_result.data[:user])
      }, status: :ok
    end
  end
end
```

### Example 4: Validation Errors

```ruby
class UserRegistrationService
  def call
    return ServiceResult.validation_failure(errors) unless valid?
    
    # Continue with registration...
  end
end
```

**Response:**
```json
{
  "error": {
    "code": "VAL_001",
    "message": "Email is invalid Username can't be blank Password is too short"
  }
}
```

## Frontend Consumption

### Error Handling by Code
```javascript
// Frontend can handle specific error codes
fetch('/api/v1/sign_in', {...})
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      switch(data.error.code) {
        case 'AUTH_001':
          showToast('Please fill in all fields');
          break;
        case 'AUTH_002':
          showToast('Invalid username or password');
          break;
        case 'AUTH_004':
          showVerificationPrompt(data.error.message);
          break;
        default:
          showToast(data.error.message);
      }
    }
  });
```

### Grouped Error Handling
```javascript
const AUTH_ERRORS = ['AUTH_001', 'AUTH_002', 'AUTH_003', 'AUTH_004'];
const VALIDATION_ERRORS = ['VAL_001', 'VAL_002', 'VAL_003'];

if (AUTH_ERRORS.includes(data.error.code)) {
  handleAuthError(data.error);
} else if (VALIDATION_ERRORS.includes(data.error.code)) {
  handleValidationError(data.error);
}
```

## Migration Guide

### Step 1: Update Service
```ruby
# Before
def failure_result(errors)
  Result.new(success: false, errors: errors)
end

# After
ServiceResult.failure(
  error_code: ErrorCodes::APPROPRIATE_CODE,
  messages: errors
)
```

### Step 2: Update Controller
```ruby
# Before
if result.success?
  render json: {...}, status: :ok
else
  render json: { error: result.message }, status: :bad_request
end

# After
render_result(result, success_status: :ok) do |success_result|
  render json: {...}, status: :ok
end
```

## Adding New Error Codes

1. Add to `app/constants/error_codes.rb`:
```ruby
module ErrorCodes
  NEW_ERROR_CODE = 'CATEGORY_XXX'
  
  HTTP_STATUS_MAP = {
    NEW_ERROR_CODE => :appropriate_status,
    # ...
  }.freeze
end
```

2. Use in service:
```ruby
ServiceResult.failure(
  error_code: ErrorCodes::NEW_ERROR_CODE,
  messages: ["Error message"]
)
```

## Benefits

1. **Consistent Error Format**: All API errors follow the same structure
2. **Programmatic Handling**: Frontend can handle errors by code, not by parsing messages
3. **Separation of Concerns**: Services handle business logic, controllers handle HTTP
4. **Easy to Extend**: Add new error codes without changing service/controller logic
5. **Multiple Messages**: Accumulate multiple validation errors with same code
6. **Type Safety**: Error codes are constants, reducing typos
7. **Self-Documenting**: Error codes clearly indicate the error category

## Error Code Categories

- `AUTH_XXX`: Authentication/authorization errors
- `USER_XXX`: User management errors
- `VAL_XXX`: Validation errors
- `PWD_XXX`: Password management errors
- `EMAIL_XXX`: Email verification errors
- `PROJ_XXX`: Project management errors
- `SYS_XXX`: System/infrastructure errors
