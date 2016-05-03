class Sale < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer
  monetize :total_centavos, :as => "total"
  serialize :items

  def self.range(date)
    if(date == 'today')
      where(:created_at => DateTime.now.beginning_of_day..DateTime.now.end_of_day)
    elsif(date == 'yesterday')
      where(:created_at => (DateTime.now.beginning_of_day - 1.day)..(DateTime.now.end_of_day - 1.day))
    elsif(date == 'lastweek')
      where(:created_at => (Date.today.advance(:days => -7).beginning_of_day - 1.day)..(Date.today.advance(:days => -7).end_of_day - 1.day))
    elsif(date == 'lastmonth')
      where(:created_at => (Date.today.advance(:months => -1).beginning_of_day - 1.day)..(Date.today.advance(:months => -1).end_of_day - 1.day))
    end      
  end
end
