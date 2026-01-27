# frozen_string_literal: true

# Concern for rendering standardized API error responses
# Include this in ApplicationController or specific API controllers
module ApiErrorRenderer
  extend ActiveSupport::Concern

  # Render error response from ServiceResult
  # @param result [ServiceResult] The service result object
  # @return [void]
  def render_error(result)
    status = ErrorCodes.http_status_for(result.error_code)
    
    render json: {
      error: {
        code: result.error_code,
        message: result.message
      }
    }, status: status
  end

  # Render success response with data
  # @param data [Hash] Response data
  # @param message [String] Optional success message
  # @param status [Symbol] HTTP status (default: :ok)
  # @return [void]
  def render_success(data: nil, message: nil, status: :ok)
    response = {}
    response[:message] = message if message
    response[:data] = data if data
    
    render json: response, status: status
  end

  # Helper to render result (success or error)
  # @param result [ServiceResult] The service result object
  # @param success_status [Symbol] HTTP status for success (default: :ok)
  # @param success_message [String] Optional success message override
  # @return [void]
  def render_result(result, success_status: :ok, success_message: nil, &success_block)
    if result.success?
      if block_given?
        # Allow custom success rendering
        yield result
      else
        render_success(
          data: result.data,
          message: success_message || result.message,
          status: success_status
        )
      end
    else
      render_error(result)
    end
  end
end
