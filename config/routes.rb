Rails.application.routes.draw do
    root to: 'tasks#index'
    post '/tasks', to: 'tasks#create'
    get '/tasks/create', to: 'tasks#new'
    post '/tasks/create', to: 'tasks#create'
    get '/tasks/:id', to: 'tasks#show', as: 'task'
    delete '/tasks/:id', to: 'tasks#destroy'
    put '/tasks/:id', to: 'tasks#update'
    post 'pages/ai_request', to: 'pages#ai_request'
end
