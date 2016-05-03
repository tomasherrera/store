class Api::SalesController < ApplicationController
  respond_to :json

  def index
    @sales = Sale.all.includes(:user, :customer)
  end

  def create
    @sale = Sale.new
    @sale.user = current_user
    @sale.items = params[:items]
    @sale.customer_id = params[:customer_id]
    @sale.payment = params[:payment]
    @sale.total = params[:total]
    @sale.status = params[:status]
    @sale.save!
  end

  private

  def sales_params
    accessible = [:items, :total] # extend with your own params
    params.require(:sale).permit(accessible)
  end

end
