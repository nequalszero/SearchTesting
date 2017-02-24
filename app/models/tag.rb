# == Schema Information
#
# Table name: tags
#
#  id          :integer          not null, primary key
#  product_id  :integer          not null
#  tag_name_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Tag < ActiveRecord::Base
  belongs_to :product
  belongs_to :tag_name

  validates :tag_name_id, :product_id, presence: true
end
