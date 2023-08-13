class AiRequestJob < ApplicationJob
  queue_as :default

  def perform(ai_request_params, api_key)
    # Do something later
    connection = Faraday.new(url: 'https://api.openai.com')

    response = connection.post do |req|
      req.url "/v1/engines/#{ai_request_params[:ai_model]}/completions"
      req.headers['Content-Type'] = 'application/json'
      req.headers['Authorization'] = "Bearer #{api_key}"
      req.body = {
        prompt: ai_request_params[:prompt],
        max_tokens: 100,
        temperature: 0.5,
        n: 1
      }.to_json
    end

    json_response = JSON.parse(response.body)
    puts "json response is #{json_response}"
    generated_idea = json_response['choices'][0]['text']
    puts "generated idea is #{generated_idea}"
    generated_idea
    # uuid = ai_request_params[:uuid]
    # Turbo::StreamsChannel.broadcast_replace_to("channel_#{uuid}",
    #                                           target: 'ai_output',
    #                                           partial: 'ai/output',
    #                                           locals: { generated_idea: })
  end
end