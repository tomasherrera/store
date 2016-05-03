class Api::ItemsController < ApplicationController
  respond_to :json
  def index
    @items= Item.all
  end
end
