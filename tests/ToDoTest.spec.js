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

test('should allow adding new To-Do items (TC-S1-01)', async ({ page }) => {
  const todoText1 = 'Einkaufen';
  const todoText2 = 'Sport machen';

  // --- Step 1: Enter "Einkaufen" and click the Add button ---
  await todoPage.addTodo(todoText1);

  // Assertions for Step 1
  await expect(todoPage.todoInput).toHaveValue('');
  await expect(todoPage.todoItems).toContainText([todoText1]);

  let activeCount = await todoPage.getTheNumberOfAktivToDos();
  expect(activeCount).toBe(1);

  // --- Step 2: Enter "Sport machen" and press the Enter key ---
  await todoPage.todoInput.fill(todoText2);
  await todoPage.todoInput.press('Enter');

  // Assertions for Step 2
  await expect(todoPage.todoInput).toHaveValue('');
  await expect(todoPage.todoItems).toContainText([todoText1, todoText2]);

  activeCount = await todoPage.getTheNumberOfAktivToDos();
  expect(activeCount).toBe(2);

  // --- Step 3: Reload page (F5) and verify persistence ---
  await page.reload();

  // Assertions for Step 3
  await expect(todoPage.todoItems).toContainText([todoText1, todoText2]);

  activeCount = await todoPage.getTheNumberOfAktivToDos();
  expect(activeCount).toBe(2);
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

  // Step 1 Assertion: Verify immediate update (without reload)
  await expect(page.getByText(todoText2)).not.toBeVisible();
  let activeCount = await todoPage.getTheNumberOfAktivToDos();
  expect(activeCount).toBe(2);

  // 3. Reload page to test persistence 
  await page.reload();

  // Step 2 Assertion: Verify state remains unchanged after reload
  await expect(page.getByText(todoText2)).not.toBeVisible();
  activeCount = await todoPage.getTheNumberOfAktivToDos();
  expect(activeCount).toBe(2);
});
  


});