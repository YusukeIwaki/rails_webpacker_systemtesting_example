require 'rails_helper'

RSpec.describe 'login' do
  let!(:user) { create(:user) }

  it 'shows username on dashboard' do
    visit '/login'
    fill_in(:name, with: user.name)
    fill_in(:password, with: 'password!')
    find('input[type="submit"]').click

    expect(page).to have_text(user.name)
  end

  it 'shows error when name is not found' do
    visit '/login'
    fill_in(:name, with: "#{user.name}~~")
    fill_in(:password, with: 'password!')
    find('input[type="submit"]').click

    expect(page).to have_text("LOGIN")
  end
end
