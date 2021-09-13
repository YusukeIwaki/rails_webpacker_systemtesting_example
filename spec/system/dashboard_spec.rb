require 'rails_helper'

RSpec.describe 'dashboard' do
  context 'not logged in' do
    it 'should have no greet messages' do
      visit '/dashboard'
      expect(page).not_to have_text("こんにちは")
    end
  end

  context 'logged in' do
    let!(:user) { create(:user) }

    before {
      visit '/login'
      fill_in(:name, with: user.name)
      fill_in(:password, with: 'password!')
      find('input[type="submit"]').click
    }

    it 'should greet to user' do
      visit '/dashboard'
      expect(page).to have_text("こんにちは#{user.name}さん")
    end
  end

  context 'no announcements' do
    it 'should show empty state' do
      visit '/dashboard'

      expect(page).to have_text('お知らせはありません')
    end
  end

  context 'some announcements' do
    let!(:announcement1) { create(:announcement) }
    let!(:announcement2) { create(:announcement, :with_description) }

    it 'should show announcement titles' do
      visit '/dashboard'

      expect(page).not_to have_text('お知らせはありません')
      expect(page).to have_text(announcement1.title)
      expect(page).to have_text(announcement2.title)
    end
  end
end
