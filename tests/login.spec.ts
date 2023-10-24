import { test as base, expect } from '@playwright/test';

import { railsBeginTransaction, railsFactoryBotCreate, railsRollbackTransaction } from './rails_helper'

// require 'rails_helper'

// RSpec.describe 'login' do
//   let!(:user) { create(:user) }

//   it 'shows username on dashboard' do
//     visit '/login'
//     fill_in(:name, with: user.name)
//     fill_in(:password, with: 'password!')
//     find('input[type="submit"]').click

//     expect(page).to have_text(user.name)
//   end

//   it 'shows error when name is not found' do
//     visit '/login'
//     fill_in(:name, with: "#{user.name}~~")
//     fill_in(:password, with: 'password!')
//     find('input[type="submit"]').click

//     expect(page).to have_text("LOGIN")
//   end
// end

// https://playwright.dev/docs/test-fixtures

type User = { name: string }
type LoginFixture = {
  transactional: void,
  user: User,
}

const test = base.extend<LoginFixture>({
  transactional: [async ({ request }, use) => {
    await request.post('/__e2e__/begin_transaction')
    await use()
    await request.post('/__e2e__/rollback_transaction')
  }, { auto: true }],
  user: async ({ request }, use) => {
    const userResponse =
      await request.post('/__e2e__/factory_bot/create?name=user', { password: 'password!' })
    const user = await userResponse.json() as User
    await use(user)
  },
})

test('shows username on dashboard', async ({ page, user }) => {
  await page.goto('/login');
  await page.fill('input[name="name"]', user.name);
  await page.fill('input[name="password"]', 'password!');
  await page.click('input[type="submit"]');

  await expect(page.locator('body')).toContainText(user.name);
})

test('shows error when name is not found', async ({ page, user }) => {
  await page.goto('/login');
  await page.fill('input[name="name"]', `${user.name}~~`);
  await page.fill('input[name="password"]', 'password!!');
  await page.click('input[type="submit"]');

  await expect(page.locator('body')).toContainText('LOGIN');
})
