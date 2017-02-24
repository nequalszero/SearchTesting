# == Schema Information
#
# Table name: tag_maps
#
#  id          :integer          not null, primary key
#  tag_name_id :integer          not null
#  product_ids :integer          default("{}"), not null, is an Array
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TagMap < ActiveRecord::Base
  validates :tag_name_id, :product_ids, presence: true

  belongs_to :tag_name

  # Adds a product_id to the product_ids array associated with the tag_name_id.
  # If the tag_name_id does not exist, a new row is created.
  def self.assign_product_id(tag_name_id, product_id)
    if TagMap.where(tag_name_id: tag_name_id).exists?
      tag_map = TagMap.find_by(tag_name_id: tag_name_id)
      tag_map.product_ids << product_id
      tag_map.save
    else
      TagMap.create(tag_name_id: tag_name_id, product_ids: [product_id])
    end
  end

  def self.remove_product_id(tag_name_id, product_id)
    tag_map = TagMap.find_by(tag_name_id: tag_name_id)
    tag_map.product_ids.delete(product_id)
    tag_map.save
  end
end
