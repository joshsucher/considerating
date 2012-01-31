class Consideration < ActiveRecord::Base
	attr_accessible :content
	
	belongs_to :user
	
	default_scope :order => 'considerations.created_at DESC'
	
	validates :user_id, :presence => true
	validates :content, :presence => true, :length => { :maximum => 500 }
	validates_exclusion_of :content, :in => %w( http href ), :message => "No links please!"

	def self.random
       	if (c = count) != 0
         	find(:first, :offset => rand(c))
       	end
	end
end