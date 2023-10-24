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
type LoginFixture = { user: User }

const test = base.extend<LoginFixture>({
  user: async ({}, use) => {
    await railsBeginTransaction()
    const user = await railsFactoryBotCreate(':user', { password: 'password' })
    await use(user)
    await railsRollbackTransaction()
  },
})

test('shows username on dashboard', async ({ page, user }) => {
  await page.goto('/login');
  await page.fill('#name', user.name);
  await page.fill('#password', 'password!');
  await page.click('input[type="submit"]');

  await expect(page.locator('body')).toHaveText(user.name);
})

test('shows error when name is not found', async ({ page, user }) => {
  await page.goto('/login');
  await page.fill('#name', `${user.name}~~`);
  await page.fill('#password', 'password!');
  await page.click('input[type="submit"]');

  await expect(page.locator('body')).toHaveText('LOGIN');
})
