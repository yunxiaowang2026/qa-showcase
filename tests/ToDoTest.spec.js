// ToDoTest.spec.js
const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/todo.page');

test.describe('To-Do App (POM Architecture)', () => {
  let todoPage;

  // Runs before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should load the page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/To-Do/i);
  });

  test('should allow adding a To-Do item', async () => {
    const todoText = 'Wandern';

    // 1. Take initial screenshot
    await todoPage.takeScreenshot('01_screenshot');

    // 2. Add a to-do item
    await todoPage.addTodo(todoText);
    await todoPage.takeScreenshot('02_screenshot');

    // 3. Assertions
    // Assertion A: Verify input field is cleared after submission
    await expect(todoPage.todoInput).toHaveValue('');

    // Assertion B: Verify the item is actually added to the list
    await expect(todoPage.todoItems).toContainText(todoText);

    // Get the actual number from the Page Object
    const activeCount = await todoPage.getTheNumberOfAktivToDos();

    // Perform assertion in the spec file
    expect(activeCount).toBe(1);
  });

  test('should allow deleting a To-Do item', async ({ page }) => {
    const todoText1 = 'Einkaufen gehen';
    const todoText2 = 'Wandern';
    const todoText3 = 'Deutsch lernen';

    // 1. Add 3 to-do items first to prepare test data
    await todoPage.addTodo(todoText1);
    await todoPage.addTodo(todoText2);
    await todoPage.addTodo(todoText3);

    // 2. Perform delete action
    await todoPage.deleteTodoByText(todoText2);

    // Assertion: Verify the deleted item text is no longer visible
    await expect(page.getByText(todoText2)).not.toBeVisible();

    // Get the actual number from the Page Object
    const activeCount = await todoPage.getTheNumberOfAktivToDos();

    // Perform assertion in the spec file
    expect(activeCount).toBe(2);

  });

  


});