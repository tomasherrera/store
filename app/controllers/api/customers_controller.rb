class Api::CustomersController < ApplicationController
  respond_to :json

  def index
    @customers = Customer.all
  end

  def show
  end

  def create
  end
end
