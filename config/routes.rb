Rails.application.routes.draw do
    get '/tasks', to: 'tasks#index'
    post '/tasks', to: 'tasks#create'
    get '/tasks/create', to: 'tasks#new'
    post '/tasks/create', to: 'tasks#create'
    get '/tasks/:id', to: 'tasks#show', as: 'task'
    delete '/tasks/:id', to: 'tasks#destroy'
end
