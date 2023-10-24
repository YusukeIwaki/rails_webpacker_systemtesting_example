import { test as base, expect } from '@playwright/test';

type User = { name: string }
type DashboardFixture = {
    user: User,
    loginUser: User,
}

const test = base.extend<DashboardFixture>({
    user: async ({ request }, use) => {
        const userResponse =
            await request.post('/__e2e__/factory_bot/create?name=user')
        const user = await userResponse.json() as User
        await use(user)
    },
    loginUser: async ({ request }, use) => {
        const userResponse =
            await request.post('/__e2e__/factory_bot/create?name=user')
        const user = await userResponse.json() as User
        await request.post('/__e2e__/eval', {
            data: `SimpleStub.for_instance_method(ApplicationController, :current_user) { User.last }.apply!`
        })
        await use(user)
        await request.post('/__e2e__/eval', {
            data: `SimpleStub.for_instance_method(ApplicationController, :current_user) { User.last }.reset!`
        })
    },
})

test('shows username on dashboard', async ({ page, loginUser }) => {
    await page.goto('/dashboard');

    await expect(page.locator('body')).toContainText(loginUser.name);
})
