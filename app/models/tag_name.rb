# == Schema Information
#
# Table name: tag_names
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'set'

class TagName < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :tags
  has_many :tag_maps

  def self.retrieve_tag_name(name)
    tag_name = TagName.where(name: name).exists? ? TagName.find_by(name: name) : TagName.create(name: name)
  end

  def self.get_test_keywords(num_keywords_per_group = 1, num_groups = TagName.count)
    return TagName.pluck(:name)
                  .shuffle.map { |tag| [tag] }
                  .take(num_groups) if num_keywords_per_group == 1

    tag_names = TagName.pluck(:name)
    tag_combos = Set.new

    until tag_combos.length == num_groups
      new_group = Set.new

      until new_group.length == num_keywords_per_group
        new_tag = tag_names.sample
        new_group << new_tag unless new_group.include?(new_tag)
      end

      tag_combos << new_group unless tag_combos.include?(new_group)
    end

    tag_combos.to_a.map { |set| set.to_a }
  end

  def self.get_tag_name_ids(keywords)
    TagName.find_by_sql([<<-SQL, keywords])
      SELECT
        id
      FROM
        tag_names
      WHERE
        name IN (?)
    SQL
  end
end
