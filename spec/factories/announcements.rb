FactoryBot.define do
  factory :announcement do
    title { Faker::Lorem.sentence }

    trait :with_description do
      description { Faker::Lorem.paragraph }
    end
  end
end
