class TasksController < ApplicationController
  # before_action :set_task, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /tasks or /tasks.json
  def index
    @tasks = Task.all
    render json: @tasks
  end

  # GET /tasks/1 or /tasks/1.json
  def show
    @task = Task.find(params[:id])
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)

    if @task.save
      puts 'task successfully created'
      redirect_to task_path(@task)
    else
      # render :new, status: :unprocessable_entity
      render :new
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    puts 'enters'
    @task = Task.find(params[:id])

    if @task.update(task_params)
      puts 'task successfully updated'
    else
      render 'edit'
    end

    # respond_to do |format|
    #   if @task.update(task_params)
    #     format.html { redirect_to task_url(@task), notice: "Task was successfully updated." }
    #     format.json { render :show, status: :ok, location: @task }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @task.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    puts 'enters'
    @resource = Task.find(params[:id])
    @resource.destroy

    render json: { status: 'SUCCESS', message: 'Task deleted' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_task
    #   @task = Task.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:message, :completed)
    end
end
