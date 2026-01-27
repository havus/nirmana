# frozen_string_literal: true

# Shared Result class for all services
# Services should return business-level error codes, not HTTP status codes
# Controllers will map error codes to appropriate HTTP status
class ServiceResult
  attr_reader :data, :error_code, :messages

  def initialize(success:, data: nil, error_code: nil, messages: [])
    @success = success
    @data = data
    @error_code = error_code
    @messages = Array(messages)
  end

  def success?
    @success
  end

  def failure?
    !@success
  end

  # Concatenate all messages into a single string
  def message
    @messages.join(' ')
  end

  # Add additional error message (useful for accumulating errors with same error_code)
  def add_message(msg)
    @messages << msg
    self
  end

  # Factory methods for common patterns
  class << self
    def success(data: nil, messages: [])
      new(success: true, data: data, messages: messages)
    end

    def failure(error_code:, messages: [])
      new(success: false, error_code: error_code, messages: messages)
    end

    # Create failure from validation errors
    def validation_failure(errors)
      new(
        success: false,
        error_code: ErrorCodes::VALIDATION_ERROR,
        messages: errors.is_a?(ActiveModel::Errors) ? errors.full_messages : Array(errors)
      )
    end
  end
end
