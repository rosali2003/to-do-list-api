class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_api_key, only: [:ai_request]


  def home
    @uuid = SecureRandom.uuid
  end

  def ai_request
    puts "entering ai_request"
    generated_idea = AiRequestJob.perform_now(ai_request_params, @api_key)
    puts "in pages controller generated idea is #{generated_idea}"
    render json: {generated_idea: generated_idea}
  end
  
  private

  def ai_request_params
    puts "prompt is #{params[:prompt]}"
    puts "ai model is #{params[:ai_model]}"
    params.require(:ai_request).permit(:prompt, :ai_model)
  end

  def set_api_key
    # puts "enters"
    # puts "api key is #{Rails.application.credentials.openai[:api_key]}"
    @api_key = Rails.application.credentials.openai[:api_key]
  end
end
